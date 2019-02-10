FROM node:8.15.0-alpine as builder

ARG SSH_PRIVATE_KEY

COPY package.json yarn.lock* ./

RUN apk add --update --no-cache openssh git && \
  mkdir -p /root/.ssh && \
  chmod 0700 /root/.ssh && \
  ssh-keyscan github.com > /root/.ssh/known_hosts && \
  echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && \
  chmod 600 /root/.ssh/id_rsa && \
  yarn install --pure-lockfile --ignore-optional && yarn cache clean && \
  rm -rf /root/.ssh/


FROM node:10.15.0-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY --from=builder node_modules node_modules/
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . .

USER node

CMD ["yarn", "start" ]
