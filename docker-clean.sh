#! /c/Program Files/Git/bin/bash

echo -e "\nSTOPING DOCKER\n"
docker compose down

echo -e "\nREMOVING DOCKER IMAGE\n"
docker image rm klika_tech-server

echo -e "\nREMOVING VOLUME\n"
docker volume rm klika_tech_pg-data-musics