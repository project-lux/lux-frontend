# LUX Frontend

The lux-web repo is used to develop and maintain the frontend code for Yale LUX. The frontend contains custom components and interfaces that allow users to interact with linked data in a meaningful way.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Code structure

- `client/`contains React/Redux/TypeScript code for the Frontend single page application.
- `server/` contains code for the nodejs app that serves LUX frontend.
- `docker/` contains code to build the docker image

## Deployment

Jenkins jobs

- build: https://cicd.internal.yale.edu/job/DAM/job/builds/job/LUX%20Frontend%20-%20docker%20build/
- dev deploy: https://cicd.internal.yale.edu/job/DAM/job/dev_test_installs/job/LUX%20Frontend%20-%20dev%20deploy%20new/
- tst deploy: https://cicd.internal.yale.edu/job/DAM/job/dev_test_installs/job/LUX%20Frontend%20-%20test%20deploy%20new/

## Running client (React app) locally

(without Docker nor server)

Make sure the file `client/.env` defines required environment variables -- see `client/.env.template`.

```bash
cd client/
yarn start
```

The AJAX call to /env will fail, but the application will work because it will use the values from the local .env (or .env.development.local) file instead.

For further instructions on client setup, go to the [client folder README](https://git.yale.edu/lux-its/lux-web/blob/main/client/README.md).

## Running server locally

Build the client first

```bash
cd client/
yarn build
```

Make sure the file `server/.env` defines required environment variables -- see `server/.env.template`.

```
cd server/
yarn dev-prep
yarn dev
```

## Running Docker container locally

The files build-docker-image.sh, run-docker-container.sh, and config.json are created for convenience in running docker locally. They are not used in deployment to dev/tst/prd.

### Build

```bash
cd docker
./build-docker-image.sh
```

### Config

```
cd docker
cp config.json.template config.json
# Populate config.json with real parameter values
```

### Run

```
cd docker
./run-docker-container.sh
```

It will bring up the server at port 8080 by default.
