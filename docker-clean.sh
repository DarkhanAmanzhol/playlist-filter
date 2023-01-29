#! /c/Program Files/Git/bin/bash

echo -e "\nSTOPING DOCKER\n"
docker compose down

echo -e "\nREMOVING DOCKER IMAGE\n"
docker image rm playlist-filter-server

echo -e "\nREMOVING VOLUME\n"
docker volume rm playlist-filter_pg-data-musics