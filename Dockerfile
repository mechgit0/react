# Use Node Alpine as base image
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat nginx
WORKDIR /app
# Configure Nginx
#COPY nginx/nginx.conf /etc/nginx/nginx.conf
#COPY nginx/redirects.conf /etc/nginx/redirects.conf
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Install dependencies and set environment variables
COPY package*.json ./
ENV PORT 3000
EXPOSE 8080
# Build stage
FROM base as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Development stage
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD npm run dev
# Production stage
FROM base as production
WORKDIR /app
ENV NODE_ENV=production
RUN npm ci
# Set up user for production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
# Copy built files and configuration
#COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
# Nginx configuration
FROM base as final
COPY --from=production /app /app
CMD ["sh", "-c", "nginx & npm start"]