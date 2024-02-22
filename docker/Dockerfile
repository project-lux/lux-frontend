# debian 11: bullseye
FROM debian:11.3-slim

RUN mkdir /src
ADD . /src

# NODE_PATH necessary for yarnpkg to work
ENV NODE_PATH /usr/lib/nodejs:/usr/share/nodejs

# procps contains "free" command
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y --no-install-recommends ca-certificates wget unzip jq procps nodejs yarnpkg && \
    wget "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -O "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf ./aws && \
    rm awscliv2.zip && \
    cd /src/client/ && \
    yarnpkg install && \
    yarnpkg build && \
    cd /src/server/ && \
    yarnpkg install && \
    yarnpkg build && \
    cp package.json build/ && \
    mv /src/server/build /app && \
    rm -rf /src && \
    cd /app && \
    yarnpkg install --production && \
    yarnpkg cache clean && \
    apt-get remove -y curl wget unzip yarnpkg && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

ADD docker/import-config-start.sh /app/

WORKDIR /app

CMD ["./import-config-start.sh"]
