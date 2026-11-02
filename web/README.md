# Pase · landing y demo (Fase 0)

Landing con lista de espera y demo navegable para las entrevistas. React + Vite + Tailwind.

## Correr en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:5173.

## Páginas

| Ruta | Qué es |
| --- | --- |
| `/` | Landing: problema, funciones, precios con 40% de lanzamiento y lista de espera |
| `/demo` | Entrada a la demo y botón para reiniciarla |
| `/demo/i/:token` | Invitación que recibe una familia: confirmación, menú, QR y mesa |
| `/demo/panel` | Panel del anfitrión: confirmados, pendientes, conteo para el banquetero y mesas |
| `/demo/mesas` | Buscador de mesas por nombre (sin importar acentos) |

La demo usa un evento ficticio (`src/demo/datos.js`). Las respuestas se guardan solo en el navegador, así que lo que confirmas como invitado aparece en el panel del mismo navegador.

## Antes de publicar

1. Crea `.env.local` a partir de `.env.example` y llena al menos una opción para la lista de espera:
   - `VITE_WAITLIST_ENDPOINT`: un formulario de Formspree (gratis) u otro servicio que reciba JSON.
   - `VITE_WHATSAPP_NUMBER`: tu número; el formulario abre WhatsApp con los datos prellenados.
   
   Si no llenas ninguna, el formulario muestra un error y no se guarda nada.
2. El nombre "Pase" es provisional: se cambia en `src/config.js` (y la letra del ícono en `index.html`).
3. Publica en Vercel con la carpeta `web` como raíz. `vercel.json` ya incluye la regla para que funcionen las rutas.
