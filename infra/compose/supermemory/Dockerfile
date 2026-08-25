FROM node:22-bookworm-slim@sha256:d649c27dae7ba0137b3cef5dd75baa422c08dc3d9e3fc0c23dfb172dc3cc6436

# Official stable Linux x64 binary. Keep the release and checksum together.
ADD --checksum=sha256:bb1b7cee393818236873b8e2518a435e10d9195e27ea5608a3af48a733ef8ee8 \
  https://github.com/supermemoryai/supermemory/releases/download/server-v0.0.6/supermemory-server-linux-x64 \
  /usr/local/bin/supermemory-server
COPY --chown=node:node infra/compose/supermemory/entrypoint.mjs /usr/local/lib/supermemory-entrypoint.mjs

RUN chmod 0555 /usr/local/bin/supermemory-server \
  && mkdir -p /var/lib/supermemory \
  && chown node:node /var/lib/supermemory

USER node
ENV PORT=6767
ENV SUPERMEMORY_DATA_DIR=/var/lib/supermemory
EXPOSE 6767
ENTRYPOINT ["node", "/usr/local/lib/supermemory-entrypoint.mjs"]
