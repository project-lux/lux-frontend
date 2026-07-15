FROM node:22.21.0-bookworm-slim

RUN mkdir /src
ADD . /src

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates libatomic1 \
      wget unzip jq procps && \
    wget "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -O "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf ./aws && \
    rm awscliv2.zip && \
    wget -qO- https://get.pnpm.io/install.sh | \
      env PNPM_VERSION=11.13.0 ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - && \
    . $HOME/.bashrc && \
    cd /src/client/ && \
    pnpm install && \
    npx -y browserslist@latest --update-db && \
    pnpm build && \
    cd /src/server/ && \
    pnpm install && \
    pnpm build && \
    cp package.json build/ && \
    mv /src/server/build /app && \
    rm -rf /src && \
    cd /app && \
    pnpm install --production && \
    rm -rf $(pnpm store path) && \
    apt-get remove -y wget unzip && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

ADD docker/import-config-start.sh /app/

WORKDIR /app

CMD ["./import-config-start.sh"]
