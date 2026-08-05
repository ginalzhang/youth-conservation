# Bay Area Youth Conservation Website

Multi-page Astro static site for Bay Area Youth Conservation.

## Local Development

```sh
npm install
npm run dev
```

The dev command starts TinaCMS and Astro together. Open the public site at the Astro URL printed in the terminal, then open the editor at:

```text
/admin/index.html
```

## Production Build

```sh
npm run build
```

The build script generates the Tina admin app first, then builds the Astro site. If Tina Cloud credentials are not present, it uses local content mode so public builds still pass.

## Admin Setup

Editable content lives in `content/`. Team member photos and other uploaded images should go through Tina's media manager, which stores repo-backed files in `public/uploads/`.

For production editing, create a Tina Cloud project connected to this GitHub repo and set these environment variables in Vercel:

```sh
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
NEXT_PUBLIC_TINA_BRANCH=main
```

Use `.env.example` as the local template. Do not commit real Tina tokens.
