FROM oven/bun:1.2-debian AS build

ARG VITE_GRAPHQL_ENDPOINT
ENV VITE_GRAPHQL_ENDPOINT=$VITE_GRAPHQL_ENDPOINT
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
COPY . .
RUN bun run build

FROM nginx:1.29.1-alpine3.22

COPY src/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]