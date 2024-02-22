#!/bin/bash

PORT=${PORT:-8080}
IMAGE=${DOCKER_IMAGE:-lux-frontend}
CONTAINER=${DOCKER_CONTAINER_NAME:-lux-frontend}
HOST_CONFIG_JSON=$(pwd)/config.json

# By setting USE_LOCAL_CONFIG_JSON to yes, container will use local config.json
# instead of trying to# download it from S3, which requires kms:Decrypt privelege.
export USE_LOCAL_CONFIG_JSON=yes
ENVS="-e USE_LOCAL_CONFIG_JSON=yes"
VOLUMES="-v ${HOST_CONFIG_JSON}:/app/config.json"

echo "Stopping the running $CONTAINER container (if any)"
running=$(docker inspect -f {{.State.Running}} $CONTAINER 2> /dev/null)
if [ "${running}" = 'true' ]; then
  docker stop $CONTAINER
fi

echo "Removing the existing $CONTAINER container (if any)"
inactive_id=$(docker ps -aq -f status=exited -f status=created -f name=${CONTAINER})
if [ "${inactive_id}" != '' ]; then
  docker rm $CONTAINER
fi

function run_i {
  docker run --platform=linux/amd64 -it --name $CONTAINER \
    -p ${PORT}:8080 \
    ${ENVS} \
    ${VOLUMES} \
    $IMAGE /bin/bash
}

function run {
  docker run --platform=linux/amd64 -d --name $CONTAINER \
  -p ${PORT}:8080 \
  ${ENVS} \
  ${VOLUMES} \
  $IMAGE
}

set -x

if [ "${1}" = "i" ]; then
  run_i
else
  run
fi
