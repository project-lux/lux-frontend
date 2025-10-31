#!/bin/sh

# Run from the root directory, e.g.
# $ ./docker/build-docker-image.sh

IMAGE_NAME=${IMAGE_NAME:-lux-frontend}

docker build --platform=linux/amd64 -t $IMAGE_NAME -f docker/Dockerfile .
