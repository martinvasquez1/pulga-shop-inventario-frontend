Pulga Shop - Local Docker Compose (Frontend + Backend + Postgres + Redis + pgAdmin)

Short instructions to run the integrated stack locally on Windows PowerShell.

Files created:
- `docker-compose.yml` — compose file with frontend, backend, postgres, redis, pgadmin
- `Dockerfile` — frontend multi-stage build (serves static files on port 3000)
- `.dockerignore`

1) Build and start the stack

PowerShell:
```
# From project root
docker compose -f .\docker-compose.yml up -d --build
```

Expected quick checks after startup:
- Frontend UI: http://localhost:16004/  (maps to container port 3000)
- Backend API: http://localhost:16014/api  (depends on backend; if built from code it should expose /api)
- Postgres: 5432 inside the container, mapped to host 16010
- Redis: localhost:6379
- pgAdmin: http://localhost:8080 (user: admin@local / password: admin)

2) View logs
```
docker compose -f .\docker-compose.yml logs -f frontend backend
```

3) Generate a JWT test token (example)

PowerShell example to create a token by running node inside the backend container (requires `jsonwebtoken` available in the backend image):

```
# Capture token into a PowerShell variable (note: use -T to avoid tty issues on Windows)
$token = docker compose exec -T backend node -e "console.log(require('jsonwebtoken').sign({id:1,email:'test@example.com'}, process.env.JWT_SECRET || 'EstoEsUnSecretoSuperSeguro',{expiresIn:'7d'}))"

# Use the token to call a protected endpoint
Invoke-RestMethod -Uri "http://localhost:16014/api/protected" -Headers @{ Authorization = "Bearer $token" }
```

Notes & troubleshooting:
- If you have a backend source tree and want to build it locally, create `./Plan-integracion/backend` and place the backend code there, then uncomment the `build` section under the `backend` service in `docker-compose.yml`.
- If you have a SQL dump at `./Plan-integracion/db_dump.sql`, uncomment the commented volume line in the `postgres` service to auto-import it on first run.
- Healthchecks are provided; use `docker compose ps` to see service status.
- JWT_SECRET default is `EstoEsUnSecretoSuperSeguro` (development only). Change for production.

Common fixes:
- If `prisma generate` fails in backend builds, ensure the backend `Dockerfile` copies `prisma` before running `npx prisma generate` (see template `Plan-integracion/backend/Dockerfile` if you use it).
- If you get conflicts with existing containers, remove them (for example: `docker rm -f pulga-redis`) or avoid setting `container_name` in compose.
