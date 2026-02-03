#!/bin/bash
set -u

docker compose down
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -q)
sudo rm -rf vols/pgsql vols/pgadm vols/gitea/etc vols/gitea/data
mkdir -p vols/pgsql vols/pgadm vols/gitea/etc vols/gitea/data