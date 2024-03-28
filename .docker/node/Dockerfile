FROM node:20-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY ./node .

RUN npm i

EXPOSE 3000
