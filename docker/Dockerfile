FROM node:20.18.0-bookworm-slim

RUN mkdir /src
ADD . /src

# procps contains "free" command
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates wget unzip jq procps && \
    wget "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -O "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf ./aws && \
    rm awscliv2.zip && \
    cd /src/client/ && \
    yarn install && \
    npx browserslist@latest --update-db && \
    yarn build && \
    cd /src/server/ && \
    yarn install && \
    yarn build && \
    cp package.json build/ && \
    mv /src/server/build /app && \
    rm -rf /src && \
    cd /app && \
    yarn install --production && \
    yarn cache clean && \
    apt-get remove -y curl wget unzip yarn && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

ADD docker/import-config-start.sh /app/

WORKDIR /app

CMD ["./import-config-start.sh"]
