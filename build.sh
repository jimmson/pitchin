#!/bin/bash

set -x

# Service to build
SERVICE=${1}
# TODO(): Check errors    
TAG=$(($(docker images jimbones/pitchin-${SERVICE} -q --format "{{.Tag}}" | sort -n | tail -1) + 1))

if [ -z "${SERVICE}" ]
then
    echo "service is empty"
    exit 1
fi

if [ ! -d "./${SERVICE}" ]
then
    echo "service ${SERVICE} does not exist"
    exit 1
fi

# Checkout latest
git checkout master
git pull

# Build backend
(
    cd ${SERVICE}
    npm install
    npm run build

    docker build -t jimbones/pitchin-${SERVICE}:latest -t jimbones/pitchin-${SERVICE}:3 .
    docker push     jimbones/pitchin-${SERVICE}
)

# Deploy service
ansible-playbook  playbook.yml --extra-vars "tag=${TAG}" --extra-vars "service=${SERVICE}"