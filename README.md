# LUX Frontend

The lux-frontend repo is used to develop and maintain the frontend code for Yale LUX. The frontend contains custom components and interfaces that allow users to interact with linked data in a meaningful way.

This project was bootstrapped with [Vite](https://vite.dev/), Core dependencies include [React](https://react.dev/),  [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/).

## Code structure

- `client/` contains React/Redux/TypeScript code for the Frontend single page application.
- `server/` contains code for the nodejs app that serves LUX frontend.
- `docker/` contains code to build the docker image

## Running client locally 

### Run with Vite dev server

Make sure that all requirements in the [client folder README](https://github.com/project-lux/lux-frontend/blob/main/client/README.md) have been met

Make sure the file `client/.env` defines required environment variables -- see `client/.env.template`.

```bash
cd client/
yarn start
```

The AJAX call to /env will fail, but the application will work because it will use the values from the local .env (or .env.development.local) file instead.

### Run with node server

1. Make sure that all requirements in the [client folder README](https://github.com/project-lux/lux-frontend/blob/main/client/README.md) have been met.
2. client/.env file, if exists,  will be complied into the build and will interfere with the server side setup. To have the node server to serve the client code, it has to be removed before build. Actually, step 3 below takes care of it because package.json defines "yarn build" so that it will move .env to _env before the build and restore it to .env after.
3. Build the client first by running the following commands:

```bash
cd client/
yarn build
```

4. Make sure the file `server/.env` defines required environment variables -- see `server/.env.template`.

```
cd server/
yarn install
yarn dev-prep
yarn dev
```

### Running Docker container locally

The files build-docker-image.sh, run-docker-container.sh, and config.json are created for convenience in running docker locally. They are not used in real deployment to dev/tst/prd.

Stay in the project root directory as you issue build and run commands below.

### Build

```bash
./docker/build-docker-image.sh
```

### Config

```
cd docker
cp config.json.template config.json
# Populate config.json with real parameter values
```

### Run

```
./docker/run-docker-container.sh
```

It will bring up the server at port 8080 by default.
