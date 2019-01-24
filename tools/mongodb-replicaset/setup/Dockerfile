FROM mongo:3.4

# Create app directory
WORKDIR /usr/src/configs

# Install app dependencies
COPY replicaSet.js .
COPY setup.sh .

CMD ["sh", "-c", "./setup.sh"]
