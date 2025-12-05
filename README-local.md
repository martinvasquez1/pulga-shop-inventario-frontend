Pulga Shop - Docker Compose Local (Frontend + Backend + Postgres + Redis + pgAdmin)

Instrucciones breves para ejecutar la pila integrada localmente en Windows PowerShell.

Archivos creados:
- `docker-compose.yml` — archivo compose con frontend, backend, postgres, redis, pgadmin
- `Dockerfile` — build multi-etapa del frontend (sirve archivos estáticos en el puerto 3000)
- `.dockerignore`

1) Construir e iniciar la pila

PowerShell:
```
# From project root
docker compose -f .\docker-compose.yml up -d --build
```

Comprobaciones rápidas esperadas después del inicio:
- Interfaz del Frontend: http://localhost:16004/  (mapeado al puerto 3000 del contenedor)
- API del Backend: http://localhost:16014/api  (depende del backend; si se construye desde código debe exponer /api)
- Postgres: 5432 dentro del contenedor, mapeado al host en el puerto 16010
- Redis: localhost:6379
- pgAdmin: http://localhost:8080 (usuario: admin@local / contraseña: admin)

2) Ver logs
```
docker compose -f .\docker-compose.yml logs -f frontend backend
```

3) Generar un token JWT de prueba (ejemplo)

Ejemplo de PowerShell para crear un token ejecutando node dentro del contenedor del backend (requiere que `jsonwebtoken` esté disponible en la imagen del backend):

```
# Capturar el token en una variable de PowerShell (nota: usar -T para evitar problemas de tty en Windows)
$token = docker compose exec -T backend node -e "console.log(require('jsonwebtoken').sign({id:1,email:'test@example.com'}, process.env.JWT_SECRET || 'EstoEsUnSecretoSuperSeguro',{expiresIn:'7d'}))"

# Usar el token para llamar a un endpoint protegido
Invoke-RestMethod -Uri "http://localhost:16014/api/protected" -Headers @{ Authorization = "Bearer $token" }
```

Notas y solución de problemas:
- Si tienes el código fuente del backend y deseas construirlo localmente, crea `./Plan-integracion/backend` y coloca el código del backend allí, luego descomenta la sección `build` bajo el servicio `backend` en `docker-compose.yml`.
- Si tienes un dump SQL en `./Plan-integracion/db_dump.sql`, descomenta la línea de volumen comentada en el servicio `postgres` para importarlo automáticamente en el primer inicio.
- Se proporcionan healthchecks; usa `docker compose ps` para ver el estado de los servicios.
- El JWT_SECRET por defecto es `EstoEsUnSecretoSuperSeguro` (solo para desarrollo). Cámbialo para producción.

Soluciones comunes:
- Si `prisma generate` falla en los builds del backend, asegúrate de que el `Dockerfile` del backend copie la carpeta `prisma` antes de ejecutar `npx prisma generate` (consulta la plantilla `Plan-integracion/backend/Dockerfile` si la usas).
- Si obtienes conflictos con contenedores existentes, elimínalos (por ejemplo: `docker rm -f pulga-redis`) o evita establecer `container_name` en el compose.
