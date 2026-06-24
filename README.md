# Web profesional para club de fútbol

Proyecto estático preparado para publicar en GitHub Pages.

## Estructura

- `index.html`: portada pública.
- `general/`: páginas públicas.
- `socios/`: portal de socios con protección demo.
- `directiva/`: panel interno con protección demo.
- `assets/css/styles.css`: estilos principales.
- `assets/js/app.js`: menú responsive y acceso demo.

## Contraseñas demo

- Socios: `socio2026`
- Directiva: `directiva2026`

Importante: esta protección es solo visual/client-side. No protege datos reales. Para información sensible hay que usar autenticación real, por ejemplo:

- Netlify/Vercel con backend o funciones serverless.
- Firebase Authentication.
- Supabase Auth.
- GitHub Pages solo para parte pública y área privada en otro servicio.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos estos archivos.
3. Ve a `Settings` → `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Branch: `main`, carpeta `/root`.
6. Guarda y espera a que GitHub genere la URL.

## Personalización rápida

Cambia en `assets/css/styles.css` las variables de color dentro de `:root`.
Cambia el nombre del club buscando `Club Deportivo Horizonte`.
Actualiza calendarios, noticias y datos de equipos editando los HTML.
