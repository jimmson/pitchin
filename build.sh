#!/bin/bash

set -x

# Build frontend
(
    cd frontend
    npm install
    npm run build
)

# Build backend
(
    cd backend
    npm install
)