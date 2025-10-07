# Seminario Integrador 2025 – Fusion

Este directorio combina los cambios más recientes del frontend (derivados de `SANTIAGOSeminario-Integrador-2025-temporal`) con el backend actualizado desde `Seminario-Integrador-2025-master`.

## Estructura

- `frontend/`: implementación de Next.js con los ajustes de autenticación y vistas por rol trabajados en la rama temporal.
- `backend/`: servicio NestJS provisto por el equipo del backend (carpeta master), sin `node_modules`, `dist` ni archivos `.env`.
- `docker-compose.yml` y archivos de configuración raíz provenientes del backend master.

## Próximos pasos

1. Revisá los README específicos en `frontend/README.md` y `backend/README.md` para las instrucciones completas de instalación.
2. Restaurá dependencias en cada subproyecto (`npm install` o `pnpm install` según corresponda).
3. Configurá las variables `.env` necesarias (no están incluidas) antes de ejecutar.

> Esta carpeta se generó automáticamente a partir de las carpetas originales para facilitar la integración.
