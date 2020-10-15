#!/bin/bash

set -x

# Service to build
SERVICE=${1}
ENV=${2}
TAG=$(($(docker images jimbones/pitchin-${SERVICE} -q --format "{{.Tag}}" | sort -n | tail -1) + 1))

if ! { [ "${ENV}" == "production" ] || [ "${ENV}" == "staging" ] ; }; 
then
    echo "invalid env"
    exit 1
fi

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

# Build 
(
    cd ${SERVICE}
    npm install --production
    npm run build

    docker build -t jimbones/pitchin-${SERVICE}:latest -t jimbones/pitchin-${SERVICE}:${TAG} --build-arg RELEASE=${ENV} .
    docker push     jimbones/pitchin-${SERVICE}:latest
    docker push     jimbones/pitchin-${SERVICE}:${TAG}
)

# Deploy service
ansible-playbook  playbook.yml --extra-vars "tag=${TAG}" --extra-vars "service=${SERVICE}"