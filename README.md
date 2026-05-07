# Mi Álbum Panini · Mundial 2026

Tracker para el álbum Panini de la Copa Mundial de la FIFA 2026 (USA · México · Canadá).

## Features

- 980 figuritas: inicio (00-08), 48 selecciones × 20, campeones (9-19)
- Login con PIN (se guarda en el dispositivo)
- Persistencia en `localStorage`
- Export/Import de backup en JSON
- Impresión A4: solo faltantes o álbum completo
- Filtros por confederación, búsqueda, "solo incompletas"
- Mobile-first, PWA-ready

## Deploy

```bash
npm install
npm run build
```

Importar el repo en Vercel → detecta Vite automáticamente → deploy.

## Stack

- React 18
- Vite
- Zero dependencies extra (solo React, sin libraries de UI)
