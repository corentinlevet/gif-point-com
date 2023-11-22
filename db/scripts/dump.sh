#!/bin/sh

container_name="gpc-db"

if [ "$( docker container inspect -f '{{.State.Running}}' $container_name )" = "true" ]; then
    echo "Dumping database..."
    docker compose exec mariadb sh -c 'mariadb-dump -uroot -ple_mdp_de_ouf --databases gpc-db > dump.sql'
    echo "Dump done"
else
    echo "Container gcp-db is not running, please run it first (docker compose up -d mariadb)" >&2
fi
