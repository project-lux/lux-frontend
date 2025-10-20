FROM node:24.10.0-bookworm-slim

RUN mkdir /src
ADD . /src

# procps contains "free" command
RUN apt-get update
RUN apt-get install -y --no-install-recommends ca-certificates wget unzip jq procps
RUN wget "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -O "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN rm -rf ./aws
RUN rm awscliv2.zip
RUN cd /src/client/ && cp index.html public/
RUN cd /src/client/ && yarn install
RUN cd /src/client/ && npx browserslist@latest --update-db
RUN cd /src/client/ && yarn build
RUN cd /src/server/ && yarn install
RUN cd /src/server/ &&  yarn build
RUN cd /src/server/ && cp package.json build/
RUN mv /src/server/build /app
RUN rm -rf /src
RUN cd /app && yarn install --production
RUN cd /app && yarn cache clean
RUN apt-get remove -y curl wget unzip yarn
RUN apt-get autoremove -y
RUN rm -rf /var/lib/apt/lists/*

ADD docker/import-config-start.sh /app/

WORKDIR /app

CMD ["./import-config-start.sh"]
