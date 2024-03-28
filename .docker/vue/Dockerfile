FROM node:21 AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY ./vue .

RUN npm install
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.25-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html


# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

WORKDIR /usr/share/nginx/html