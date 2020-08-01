#!/bin/bash

set -x

# Checkout latest
git checkout master
git pull

# Build backend
(
    cd backend
    npm install
)

# Build frontend
(
    cd frontend
    npm install
    npm run build
)

# Build backend
docker-compose build back-end
docker-compose up -d back-end

# Build frontend
docker-compose build front-end
docker-compose up -d front-end