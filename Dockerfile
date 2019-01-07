FROM node:10.14.1-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir -p /opt/app

# Set a working directory
WORKDIR /opt

# Install NodeJS in a different location for easier app bind mounting for local development

COPY . ./
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --silent --no-cache --frozen-lockfile --production --prefer-offline; \
  elif [ "$NODE_ENV" = "test" ]; then \
  touch yarn-error.log; \
  mkdir -m 777 src; \
  yarn install --no-cache --frozen-lockfile; \
  chown -R node:node src node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 src node_modules /home/node/.cache/yarn; \
  yarn install --frozen-lockfile; \
  chown -R node:node src node_modules package.json yarn.lock config.yaml yarn-error.log /home/node/.cache/yarn; \
  fi;
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

# Run the container under "node" user by default
USER node

CMD [ "node", "src/server.js" ]
