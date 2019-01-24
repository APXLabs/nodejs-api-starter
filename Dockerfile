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
  echo 'yarn-offline-mirror "./.yarn-offline"' > /opt/.yarnrc \
  yarn install --production --frozen-lockfile --offline \
  rm -rf /opt/.yarn-offline

ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

# Run the container under "node" user by default
USER node

CMD [ "node", "src/server.js" ]
