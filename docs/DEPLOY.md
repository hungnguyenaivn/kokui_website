# Deploying kokui.vn

The site is a fully static Next.js export (`out/`) hosted on Netlify. DNS for
`kokui.vn` will live on Cloudflare once the domain is registered.

## 1. First deploy (Netlify CLI)

```sh
npx netlify-cli login                     # opens the browser once
npx netlify-cli sites:create --name kokui # or kokui-hanoi if taken
npx netlify-cli link                      # if not linked automatically
npx netlify-cli deploy --build --prod
```

Then in the Netlify UI:

1. **Forms**: Site configuration → Forms → *Enable form detection*, then redeploy
   (`npx netlify-cli deploy --build --prod`). The `contact` form should appear.
   Add an email notification under Forms → Form notifications.
2. **Environment**: set `NEXT_PUBLIC_SITE_URL` to the live URL
   (`https://kokui.netlify.app` now, `https://kokui.vn` later) and redeploy.
   Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.
3. **Auto-deploys (optional)**: Site configuration → Build & deploy → Link
   repository → GitHub `hungnguyenaivn/kokui_website`, branch `main`. Every push
   then deploys and every PR gets a preview URL.

Build settings come from `netlify.toml` (`npm run build`, publish `out`, Node 22,
`NETLIFY_IMAGE_CDN=true` so `next/image` uses the Netlify Image CDN).

**Visitor access**: the `hungnguyenaivn` team protects all sites with a Netlify
login, so the public sees `401`. To launch, open Site configuration → Access &
security → Visitor access and set it to public for this site (or change the
team default under Team settings).

### Checks after each deploy

```sh
curl -sI https://<site>.netlify.app/ | grep -i location                         # → /vi/
curl -sI -H "Accept-Language: en" https://<site>.netlify.app/ | grep -i location  # → /en/
curl -s -o /dev/null -w "%{http_code}\n" https://<site>.netlify.app/vi/nope/     # → 404
```

## 2. Registering kokui.vn

`.vn` domains are sold only by VNNIC-accredited registrars (Mắt Bão, PA Vietnam,
iNET, Nhân Hòa, Tenten). Cloudflare Registrar cannot register `.vn`. You need a
CCCD (personal) or business registration papers.

## 3. Moving DNS to Cloudflare

1. Cloudflare dashboard → *Add a domain* → `kokui.vn` → Free plan.
2. Copy the two Cloudflare nameservers and set them at the `.vn` registrar.
   Wait until Cloudflare shows the zone as **Active** (minutes to 24 h).

## 4. Pointing kokui.vn at Netlify

1. Netlify → Domain management → *Add a domain* → `kokui.vn`. Netlify adds
   `www.kokui.vn` too and redirects it to the primary domain.
2. Cloudflare → DNS → Records. Set both to **DNS only (grey cloud)**:

   | Type  | Name | Target                          | Proxy    |
   |-------|------|---------------------------------|----------|
   | CNAME | `@`  | `apex-loadbalancer.netlify.com` | DNS only |
   | CNAME | `www`| `<site>.netlify.app`            | DNS only |

   Cloudflare flattens the apex CNAME automatically. If that ever fails, use
   `A @ 75.2.60.5` instead.
3. Netlify → Domain management → HTTPS → *Verify DNS configuration*, then wait
   for the Let's Encrypt certificate. Turn on **Force HTTPS**.
4. Cloudflare → SSL/TLS → mode **Full (strict)**. Never use *Flexible*.
5. Set `NEXT_PUBLIC_SITE_URL=https://kokui.vn` in Netlify and redeploy so
   canonical URLs, the sitemap and share images use the real domain.
6. Update the link in the Instagram bio.

### Why the grey cloud

With Cloudflare's proxy (orange cloud) on, Netlify cannot issue or renew its
certificate and its CDN is bypassed. Keep it off. If you ever turn it on, do it
only after the certificate exists, keep SSL mode Full (strict), and exclude
`/.well-known/acme-challenge/*` from *Always Use HTTPS*.

### Extra domains

If you later buy other domains (e.g. `kokui.com`), add them to Cloudflare and
create a Bulk Redirect `301 → https://kokui.vn/$1`.
