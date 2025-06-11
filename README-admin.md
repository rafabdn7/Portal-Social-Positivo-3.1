# Guía Rápida para Administradores

## Acceso al Panel de Administración
- Ruta: `/admin/dashboard`
- Solo accesible para usuarios con rol `admin`.
- Desde aquí puedes ver estadísticas, usuarios recientes y contenido reportado.

## Gestión de Usuarios
- Ruta: `/admin/users`
- Puedes ver todos los usuarios registrados.
- Cambia el rol de cualquier usuario a `user`, `moderator` o `admin` usando los botones.
- Los cambios se reflejan en tiempo real y quedan registrados en la base de datos.

## Seguridad
- Todas las acciones administrativas están protegidas por autenticación y validación de rol.
- Los endpoints API requieren el token JWT y validan que seas admin.

## Consejos
- No compartas tu cuenta admin.
- Usa contraseñas seguras y activa 2FA si está disponible.
- Supervisa el panel de moderación para detectar abusos o problemas en la comunidad.

---

# Troubleshooting
- Si no puedes acceder al panel, asegúrate de tener rol `admin` en la tabla `profiles` de Supabase.
- Si hay errores de API, revisa las variables de entorno y la conexión con Supabase.
