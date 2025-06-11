# Guía Rápida para Moderadores

## Acceso al Panel de Moderación
- Ruta: `/moderation`
- Accesible para usuarios con rol `moderator` o `admin`.
- Permite ver, ignorar o eliminar contenido reportado por la comunidad.

## Acciones Disponibles
- **Ignorar:** Marca el reporte como revisado y sin acción.
- **Eliminar:** Elimina el contenido reportado (simulado en la demo, integrar con backend si es necesario).
- Cada acción queda registrada en Analytics (Plausible) para trazabilidad.

## Consejos
- Revisa periódicamente el panel para mantener la comunidad segura.
- Si detectas abuso de reportes, notifícalo a un admin.

---

# Troubleshooting
- Si no puedes acceder al panel, pide a un admin que te asigne el rol `moderator` en la tabla `profiles` de Supabase.
- Si hay errores de API, revisa tu sesión y la conexión con Supabase.
