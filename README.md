# kokui website

Bilingual (Vietnamese / English) brand site for **kokui**, a Hanoi menswear
denim label. Built with Next.js 16 (static export), React 19 and Tailwind CSS 4,
hosted on Netlify. Ordering happens through Instagram DM; there is no cart.

## Run locally

```sh
nvm use            # Node 22 (Node 24+ also works)
npm install
npm run dev        # http://localhost:3000/vi/
npm run build      # static site in out/
npm run lint && npm run typecheck
```

## Where things live

| What | File |
|---|---|
| Products (names, fits, colours, images, status) | `src/content/products.ts` |
| Fits and colourways | `src/content/taxonomies.ts` |
| Store address, hours, socials, email/phone | `src/content/site.ts` |
| Size chart | `src/content/sizes.ts` |
| Lookbook photos and captions | `src/content/lookbook.ts` |
| Instagram grid on the home page | `src/content/instagram.ts` |
| All UI text (VI / EN) | `src/content/i18n/vi.ts`, `en.ts` |
| Journal posts | `src/content/journal/<slug>.<vi|en>.md` |
| Colours, fonts, spacing | `src/styles/globals.css` |

Every placeholder that needs the owner is marked `TODO` (`grep -rn TODO src`).

### Adding a journal post

Create `src/content/journal/my-post.vi.md` and `my-post.en.md`:

```md
---
title: "Tiêu đề"
date: 2026-10-20
excerpt: "Một câu tóm tắt."
cover: /images/lookbook/teal-door-1.jpg
draft: false
---
Nội dung bằng Markdown…
```

Set `draft: true` to hide a post.

### Replacing photos

The current photos are placeholders cropped from Instagram screenshots by
`scripts/crop-assets.mjs`. Drop an original photo over the same file name in
`public/images/...` (4:5 portrait works best, 1600 px+ on the long side) and
rebuild. Netlify Image CDN resizes and converts them to AVIF/WebP on the fly.

Other scripts: `npm run og` re-renders the share images in `public/brand/`,
`node scripts/icons.mjs` re-renders icons from `public/favicon.svg`.

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md) for Netlify, the `.vn` domain and
Cloudflare DNS.
