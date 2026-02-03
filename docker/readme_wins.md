프로젝트 폴더에 위 파일 3개 docker-compose.dev.yml, prod/docker-compose.prod.yml, .env)와 nginx/nginx.conf를 만드세요.

1. 개발할 때:

docker-compose -f docker-compose.dev.yml up -d (DB 등 실행)

npm run dev (앱 실행 및 코딩)

2. 서버에 배포할 때:

next.config.js에 output: 'standalone' 설정 확인.

Dockerfile 존재 확인.

docker-compose -f docker-compose.prod.yml up -d --build (전체 실행)

이렇게 관리하시면 개발부터 운영까지 아주 깔끔하게 처리됩니다!

3. Docker '죽은 이미지' 청소
   개발하다 보면 build를 여러 번 반복하게 되는데, 이때 이름 없는 이미지들(Dangling images, <none>)이 계속 쌓입니다. 이게 수십 GB가 될 수 있습니다.

docker system prune -a # 사용하지 않는 모든 이미지, 컨테이너, 네트워크를 싹 지워서 용량 확보

4. WSL2(Docker가 돌아가는 환경)의 가상 디스크 파일(ext4.vhdx)은 용량이 늘어나기만 하고, 내부 파일을 지워도 자동으로 줄어들지 않는 특성이 있습니다.

이 뻥튀기된 용량을 다시 쥐어짜서(압축해서) Windows에게 돌려주는 diskpart 사용법 4단계를 알려드립니다.

⚠️ 주의사항
작업 전에 Docker Desktop을 완전히 종료해야 합니다. (실행 중에는 파일이 잠겨 있어서 압축이 안 됩니다.)

1단계: 내 가상 디스크 파일 위치 찾기
보통 아래 경로에 있습니다. 탐색기 주소창에 복사해서 붙여넣어 보세요.

경로: %LOCALAPPDATA%\Docker\wsl\data\

파일: ext4.vhdx

확인: 이 파일의 크기가 현재 50GB, 100GB 처럼 비정상적으로 크다면 이 작업의 효과가 큽니다. 경로를 메모장에 복사해 두세요.

2단계: Docker 및 WSL 끄기 (필수)
작업 표시줄(시계 옆)의 고래 아이콘 우클릭 -> Quit Docker Desktop 클릭.

**명령 프롬프트(CMD)**나 PowerShell을 켜고 아래 명령어를 입력해서 WSL을 완전히 끕니다.

PowerShell

wsl --shutdown
3단계: Diskpart로 압축하기
이제 **명령 프롬프트(CMD)**를 [관리자 권한으로 실행] 하신 후, 아래 순서대로 명령어를 한 줄씩 입력하세요.

(1) diskpart 실행

DOS

diskpart
(프롬프트가 DISKPART> 로 바뀝니다)

(2) 가상 디스크 파일 선택 (아까 1단계에서 확인한 경로를 따옴표" 안에 넣으세요. 사용자명 부분 주의!)

DOS

select vdisk file="C:\Users\사용자명\AppData\Local\Docker\wsl\data\ext4.vhdx"
(3) 읽기 전용으로 연결 (안전장치)

DOS

attach vdisk readonly
(4) 압축 실행 (핵심) 이 과정은 용량에 따라 시간이 좀 걸립니다. 커서가 깜빡거리면 기다리세요.

DOS

compact vdisk
(5) 연결 해제 및 종료

DOS

detach vdisk
exit
4단계: 결과 확인 및 Docker 재실행
탐색기에서 아까 그 ext4.vhdx 파일 용량을 다시 확인해보세요. (예: 50GB -> 15GB로 줄어들었을 수 있습니다.)

Docker Desktop을 다시 실행합니다.

💡 팁: 언제 해야 하나요?
매일 할 필요는 없습니다.

docker system prune 명령어로 안 쓰는 이미지를 왕창 지웠을 때.

내 컴퓨터 C드라이브 용량이 빨간불이 들어왔을 때.

이때 한 번씩 해주시면 몇 십 GB씩 툭툭 떨어져 나옵니다. 256GB SSD를 쓰신다면 한 달에 한 번 정도 생각날 때 해주시면 좋습니다.
