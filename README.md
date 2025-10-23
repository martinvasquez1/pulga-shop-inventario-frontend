# Inventario Frontend - Pulga Shop

Cliente desarrollado en React para el inventario de Pulga Shop.

## Diseño En Figma

- [Preview escritorio](https://www.figma.com/proto/5z4yMW89mFpXhtoaWpLykT/pulga-shop-gestion-tienda?node-id=1-4&t=44oV7BSjAEboteSq-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A4)
- [Preview mobil](https://www.figma.com/proto/5z4yMW89mFpXhtoaWpLykT/pulga-shop-gestion-tienda?node-id=99-1256&t=0T886NVD8M4gcPHA-1&scaling=scale-down&content-scaling=fixed&page-id=99%3A1255&starting-point-node-id=99%3A1256)
- [Diseño](https://www.figma.com/design/5z4yMW89mFpXhtoaWpLykT/pulga-shop-gestion-tienda?node-id=0-1&t=N4EY0hSrmxuxUocg-1)

---

## Instalación de pnpm

**Windows:**

```bash
# Usando npm
npm install -g pnpm

# Usando Winget
winget install pnpm

# Usando Chocolatey
choco install pnpm
```

**macOS:**

```bash
# Usando npm
npm install -g pnpm

# Usando Homebrew
brew install pnpm

# Usando MacPorts
port install pnpm
```

**Linux:**

```bash
# Usando npm
npm install -g pnpm

# Usando Debian/Ubuntu
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Usando Alpine Linux
apk add pnpm
```

Para cualquier sistema operativo, también puedes usar:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Instalación

1. Clona este repositorio:

```bash
git clone <url-del-repositorio>
cd <dir-name>
```

2. Instala las dependencias con pnpm:

```bash
pnpm install
```

3. .env

```bash
VITE_API_URL=http://localhost:3000/api
```

## Ejecución

- **Desarrollo**:

```bash
pnpm dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`. Se usa Mock Service Worker si Vite se encuentra en modo desarrollo.

```ts
// src/main.tsx

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");
  return worker.start();
}
```

- **Construcción para producción**:

```bash
pnpm build
```

- **Vista previa de la versión de producción**:

```bash
pnpm preview
```

- **Ejecutar el linter**:

```bash
pnpm lint
```
