FROM node:23-alpine AS build

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


FROM nginx:alpine

# Create a non-root user to run nginx
RUN adduser -D -H -u 1001 -s /sbin/nologin todo_user

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set correct ownership and permissions
RUN chown -R todo_user:todo_user /usr/share/nginx/html && \
  chmod -R 755 /usr/share/nginx/html && \
  # Nginx needs to read and write to these directories
  chown -R todo_user:todo_user /var/cache/nginx && \
  chown -R todo_user:todo_user /var/log/nginx && \
  chown -R todo_user:todo_user /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown -R todo_user:todo_user /var/run/nginx.pid

EXPOSE 80
EXPOSE 443

# Switch to non-root user
USER todo_user

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
