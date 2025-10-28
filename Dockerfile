# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 4173
CMD ["serve", "-s", "dist"]
