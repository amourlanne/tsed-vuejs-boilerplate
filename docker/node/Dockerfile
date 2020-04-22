FROM node:14.0.0-slim

RUN apt-get update && apt-get install -y \
    # make and compile
    make g++ procps \
    # sass
    python

RUN yarn global add pm2
RUN yarn global add lerna

WORKDIR /var/www
