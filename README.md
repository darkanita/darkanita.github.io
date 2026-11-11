# darkanita.dev

Mi página de marca personal: una columna, una tipografía, tema oscuro.

## Editar contenido

| Qué | Dónde |
|---|---|
| Nombre, correo, usuarios de redes | `src/config.ts` |
| Credenciales, charlas y catálogo de repos (qué enseña cada uno) | `src/data/profile.ts` |

- **Artículos de Medium**: pon tu usuario en `social.medium`. La sección aparece sola.
- **Videos de YouTube**: pon el id del canal (`UC...`) en `social.youtubeChannelId`.
- **Repos**: el catálogo está en `catalog`, agrupado por tema. Los marcados `featured: true` salen en el inicio. Las estrellas se completan solas con la API de GitHub.

El sitio se reconstruye en cada push y todos los días, así que lo nuevo de Medium, YouTube y GitHub aparece sin tocar nada.

Páginas: `/` inicio, `/charlas`, `/repos`, `/blog` (cuando configures Medium) y `/links` para la bio de Instagram, TikTok y YouTube.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Publicación

GitHub Actions compila y publica en GitHub Pages (`.github/workflows/deploy.yml`).
En el repo: **Settings → Pages → Source: GitHub Actions**.

Para servirlo en `darkanita.dev`: **Settings → Pages → Custom domain** y en el DNS un `CNAME www → darkanita.github.io`
y los registros `A` de GitHub Pages para el dominio raíz.
