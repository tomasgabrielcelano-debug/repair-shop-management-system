# RepairShop Web (Frontend)

Frontend (React) del panel **RepairShop**. Consumí la API `/api/v1` y ofrece UX de panel: órdenes, clientes, equipos, inventario, plantillas y auditoría.

## Qué incluye (producto)

- Login con JWT (roles `Admin` / `Tech`).
- Navegación por módulos (Dashboard, Órdenes, Clientes, Equipos, Inventario, Plantillas).
- Manejo de **expiración de token**: si el backend responde 401 → se limpia sesión y se vuelve a login.
- UX de errores consistente:
  - **401**: sesión vencida → logout + aviso.
  - **403**: sin permisos → pantalla/alerta “No autorizado”.
  - **500/Network**: fallback con mensaje claro.

## Demo (credenciales seed)

Cuando el backend corre en **DEV** con seed habilitado:

- **Admin**: `admin@local` / `Admin12345`
- **Tech**: `tech@local` / `Tech123456`

## Configuración

La app necesita la URL base del backend.

### Desarrollo

Crear `.env.local`:

```bash
VITE_API_BASE=http://localhost:8080/api/v1
```

Run:

```bash
npm i
npm run dev
```

### Producción

En Cloudflare Pages / VPS (estático):

```bash
npm run build
```

Variables recomendadas:

- `VITE_API_BASE=https://TU_API_DOMAIN/api/v1`

> Importante: en prod, asegurate de tener **HTTPS** y configurar **CORS** en backend con tu dominio del frontend.

## Notas

- El backend expone healthchecks (`/healthz`, `/readyz`) para monitoreo.
- Si cambiás el prefijo de API, actualizá `VITE_API_BASE` (por default es `/api/v1`).
