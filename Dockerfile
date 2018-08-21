FROM node:8.11.3-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /opt/app

# Set a working directory
WORKDIR /opt

# Install NodeJS in a different location for easier app bind mounting for local development

COPY package.json yarn.lock ./
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --silent --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
  touch yarn-error.log; \
  mkdir -m 777 src; \
  yarn install --no-cache --frozen-lockfile; \
  chown -R node:node src node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 src node_modules /home/node/.cache/yarn; \
  yarn install --frozen-lockfile; \
  chown -R node:node src node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

# Run the container under "node" user by default
USER node

CMD [ "node", "src/server.js" ]
