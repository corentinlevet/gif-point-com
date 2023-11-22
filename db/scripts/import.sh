#!/bin/sh

container_name="gpc-db"

if [ "$( docker container inspect -f '{{.State.Running}}' $container_name )" = "true" ]; then
    echo "Importing database..."
    docker compose exec mariadb sh -c 'mariadb -uroot -ple_mdp_de_ouf < dump.sql'
    echo "Import done"
else
    echo "Container gcp-db is not running, please run it first (docker compose up -d mariadb)" >&2
fi
