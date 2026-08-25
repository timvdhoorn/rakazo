---
project: Rakazo
deploy_mode: manual
deploy_target: Operator-managed private Docker Compose overlay
lock_name: rakazo-main.lock
version_file:
risky_paths: packages/db/prisma/migrations infra/compose packages/adapters/src/supermemory-memory-provider.ts
check_cmd: pnpm check
test_cmd: pnpm test
install_cmd: pnpm install --frozen-lockfile
release_files:
readme_whats_new: false
github_release: false
npm_publish: false
source_root: apps packages
conventions: AGENTS.md CONTRIBUTING.md
db_tooling: Docker Compose data-init applies Prisma migrations before API and worker startup
---

## Manual deployment

Production URLs, secrets, host paths, and the deployment-specific Compose overlay stay outside this
public repository. Before deployment, render the base Compose file together with the private overlay,
create a verified backup, then rebuild only the services named by the private deployment runbook.

Do not treat a successful push as a production deployment. Verify API health, web reachability,
database migrations, worker startup, and every integration introduced by the release on the target
host.

## Scoped commands

- `pnpm exec biome check <files>`
- `pnpm exec vitest run <test-files>`
