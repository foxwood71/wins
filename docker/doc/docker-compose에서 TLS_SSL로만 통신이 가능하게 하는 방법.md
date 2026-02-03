<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

## 답변: docker-compose에서 TLS/SSL로만 통신이 가능하게 하는 방법

첨부하신 docker-compose.yaml을 기준으로,
**모든 서비스(PostgreSQL, pgAdmin4, Gitea)에 대해 TLS/SSL 통신만 허용**하도록 하려면
**각 서비스별로 추가 설정**이 필요합니다.

아래는 PostgreSQL, pgAdmin4, Gitea에 대해 "SSL/TLS로만 통신"을 강제하는 구체적인 방법입니다.

---

## 1. PostgreSQL: SSL 접속만 허용

### ① postgresql.conf 설정

- 이미 인증서와 키가 마운트되어 있으므로,
**postgresql.conf**에 다음을 반드시 추가해야 합니다.

```conf
ssl = on
ssl_cert_file = '/etc/ssl/certs/server.crt'
ssl_key_file = '/etc/ssl/certs/server.key'
# (CA가 있다면)
# ssl_ca_file = '/etc/ssl/certs/root.crt'
```


### ② pg_hba.conf 설정

- **hostssl**만 허용, **host**/hostnossl은 모두 거부해야 합니다.

```conf
# 모든 SSL 아닌 접속 거부
hostnossl all all all reject
# SSL만 허용, 인증방식은 scram-sha-256 또는 cert(클라이언트 인증서 필요시)
hostssl all all all scram-sha-256
```

- 만약 클라이언트 인증서까지 필요하다면:

```conf
hostssl all all all cert clientcert=verify-full
```


### ③ docker-compose.yaml에서 볼륨 마운트

- 위 설정파일을 직접 마운트해야 합니다.

```yaml
services:
  postgres:
    ...
    volumes:
      - pgsql-data:/var/lib/postgresql/data
      - ./pgsql/pgsql.crt:/etc/ssl/certs/server.crt
      - ./pgsql/pgsql.key:/etc/ssl/certs/server.key
      - ./pgsql/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
      - ./pgsql/pg_hba.conf:/var/lib/postgresql/data/pg_hba.conf
      ...
    command:
      - "postgres"
      - "-c"
      - "config_file=/var/lib/postgresql/data/postgresql.conf"
      - "-c"
      - "hba_file=/var/lib/postgresql/data/pg_hba.conf"
```

- **주의:** postgresql.conf, pg_hba.conf 경로는 실제 컨테이너 내부 경로에 맞게 지정해야 합니다.


### ④ 클라이언트 접속 환경

- 연결 문자열에 반드시 `sslmode=require` 또는 `sslmode=verify-full`을 사용해야 합니다.
- 예시:

```
postgresql://user:password@host:5432/dbname?sslmode=require
```


**참고:**
`ssl = on`만으로는 SSL/TLS를 강제하지 않습니다.
**반드시 pg_hba.conf에서 hostssl만 허용, host/hostnossl은 모두 거부**해야 합니다[^2][^3][^8][^10][^12].

---

## 2. pgAdmin4: HTTPS만 허용

- 이미 다음과 같이 설정되어 있습니다:
    - 인증서/키 마운트
    - `PGADMIN_ENABLE_TLS: 1`
    - HTTPS 포트 매핑
- **HTTP 포트를 매핑하지 않으면(80 미사용)**, HTTPS만 사용하게 됩니다.
- 예시:

```yaml
ports:
  - "15443:443"
```


---

## 3. Gitea: HTTPS만 허용

- 환경변수에서

```
GITEA__server__PROTOCOL: https
GITEA__server__CERT_FILE: /certs/server.cert
GITEA__server__KEY_FILE: /certs/server.key
```

- **HTTP 포트 매핑을 제거**하고, **HTTPS(보통 443)만 매핑**하면 됩니다.

```yaml
ports:
  - "443:443"
```

- Gitea 설정에서 HTTP 리디렉션도 활성화 가능:

```
GITEA__server__REDIRECT_OTHER_PORT: true
GITEA__server__PORT_TO_REDIRECT: 80
```


---

## 4. 네트워크/방화벽

- Docker 네트워크에서 **내부 통신도 암호화하려면**,
서비스 간 연결 역시 반드시 SSL을 사용해야 하며,
클라이언트(예: FastAPI, Gitea, pgAdmin 등)도 반드시 SSL 옵션으로 접속해야 합니다.

---

## 5. 요약

### PostgreSQL

- postgresql.conf: `ssl = on`, 인증서 경로 지정
- pg_hba.conf: `hostssl`만 허용, `hostnossl`/`host` 모두 거부
- docker-compose: 설정파일과 인증서/키 볼륨 마운트, command로 설정파일 지정
- 클라이언트: `sslmode=require` 또는 `sslmode=verify-full` 필수


### pgAdmin4/Gitea

- 인증서/키 마운트
- HTTPS 포트만 노출, HTTP 포트 미노출
- 필요시 HTTP→HTTPS 리디렉션

---

## 참고 예시 (PostgreSQL)[^2][^3][^5][^10][^12]

**postgresql.conf**

```
ssl = on
ssl_cert_file = '/var/lib/postgresql/server.crt'
ssl_key_file = '/var/lib/postgresql/server.key'
```

**pg_hba.conf**

```
hostnossl all all all reject
hostssl all all all scram-sha-256
```

**docker-compose.yaml**

```yaml
services:
  postgres:
    ...
    volumes:
      - ./pgsql/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
      - ./pgsql/pg_hba.conf:/var/lib/postgresql/data/pg_hba.conf
    command:
      - "postgres"
      - "-c"
      - "config_file=/var/lib/postgresql/data/postgresql.conf"
      - "-c"
      - "hba_file=/var/lib/postgresql/data/pg_hba.conf"
```


---

## 결론

> **위와 같이 설정하면, 모든 서비스가 SSL/TLS로만 통신하도록 강제할 수 있습니다.
> PostgreSQL은 반드시 pg_hba.conf에서 hostssl만 허용하고,
> Gitea/pgAdmin4는 HTTP 포트 미노출 및 HTTPS만 노출하면 됩니다.**
>
> 기존 docker-compose.yaml에 위 내용을 반영해 주세요.

---

**참고 문헌:**
[^2][^3][^5][^8][^10][^12]

<div style="text-align: center">⁂</div>

[^1]: docker-compose.yaml

[^2]: https://dev.to/whchi/setting-up-tls-connection-for-containerized-postgresql-database-1kmh

[^3]: https://www.percona.com/blog/enabling-and-enforcing-ssl-tls-for-postgresql-connections/

[^4]: https://docs.gitea.com/administration/https-setup

[^5]: https://dev.to/danvixent/how-to-setup-postgresql-with-ssl-inside-a-docker-container-5f3

[^6]: https://reintech.io/blog/securing-docker-containers-networks-docker-compose

[^7]: https://smallstep.com/blog/automate-docker-ssl-tls-certificates/

[^8]: https://stackoverflow.com/questions/70190434/how-to-enforce-client-to-use-ssl-for-postgresql

[^9]: https://forum.gitea.com/t/gitea-ssl-certificate/8806

[^10]: https://docs.redhat.com/fr/documentation/red_hat_enterprise_linux/9/html/configuring_and_using_database_servers/proc_configuring-tls-encryption-on-a-postgresql-server_using-postgresql

[^11]: https://docs.gitea.com/administration/config-cheat-sheet

[^12]: https://dba.stackexchange.com/questions/8580/force-postgresql-clients-to-use-ssl

[^13]: https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/PostgreSQL.Concepts.General.SSL.html

[^14]: https://stackoverflow.com/questions/70959759/postgres-in-docker-pq-ssl-is-not-enabled-on-the-server

[^15]: https://www.pgadmin.org/docs/pgadmin4/9.1/container_deployment.html

[^16]: https://www.postgresql.org/message-id/CANHuRqE+PxXzhgUQ+vuKFdGEz-9YjNVS7Afi5fsbJYK-0ZRtzw@mail.gmail.com

[^17]: https://docs.gitea.com/1.19/administration/config-cheat-sheet

[^18]: https://velog.io/@cptbluebear/Gitea-구축

[^19]: https://github.com/portainer/portainer/issues/6126

[^20]: https://betterstack.com/community/guides/scaling-docker/docker-security-best-practices/

[^21]: https://gist.github.com/mrw34/c97bb03ea1054afb551886ffc8b63c3b

[^22]: https://stackoverflow.com/questions/55072221/deploying-postgresql-docker-with-ssl-certificate-and-key-with-volumes

[^23]: https://keploy.io/blog/technology/secure-your-database-communications-with-ssl-in-docker-containers-learn-to-set-up-ssl-for-mongodb-and-postgresql-efficiently

[^24]: https://www.youtube.com/watch?v=mSuTmVhQ2fc

[^25]: https://stackoverflow.com/questions/14021998/using-psql-to-connect-to-postgresql-in-ssl-mode

[^26]: https://stackoverflow.com/questions/77043711/connect-to-a-postgresql-db-using-ssl-only

[^27]: https://www.pgadmin.org/docs/pgadmin4/latest/server_dialog.html

[^28]: https://github.com/pgadmin-org/pgadmin4/issues/6095

[^29]: https://www.postgresql.org/message-id/CAMa=N=Mqm-u-Eq=AesaxBs_iX10S8wstB6vbvaNm3n6yrdEtcA@mail.gmail.com

[^30]: https://stackoverflow.com/questions/76906769/is-getting-a-ssl-certificate-and-key-pair-necessary-for-using-postgresql

[^31]: https://github.com/go-gitea/gitea/issues/10828

[^32]: https://github.com/go-gitea/gitea/issues/14773

[^33]: https://stackoverflow.com/questions/58183139/gitea-using-a-normal-user-and-https

[^34]: https://www.reddit.com/r/selfhosted/comments/ul8mzj/gitea_redirect_http_to_https_with_nginx/

[^35]: https://docs.gitea.com/usage/authentication

[^36]: https://forums.docker.com/t/connection-security-between-client-and-server-inside-docker-compose/125629

[^37]: https://www.reddit.com/r/docker/comments/i9064l/https_between_docker_containers/

[^38]: https://peterkellner.net/2023/08/02/Enforcing-SSL-Connections-in-MySql-Using-Docker/

[^39]: https://forum.greenbone.net/t/setting-up-ssl-tls-for-docker/13187

