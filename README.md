# Toolbench — free static site template

Plain HTML, CSS, and vanilla JS. No React, no Jekyll, no Next.js, no build
step, no minification, no obfuscation. Every file is exactly what your
browser (and GitHub Pages) reads — open any file and edit it directly.

## Why no build step

You said the workflow is "banao aur upload karo" — build the tool, upload
it, done. A build step (Jekyll, Next.js, etc.) means a compile stage between
your file and the live site, and generates bundled/minified output that's
hard to read or hand-edit. This template skips that entirely: GitHub Pages
serves these files as-is. Push a file, it's live.

## Structure

```
index.html                 → homepage (tool directory, search + filter)
tools/word-counter.html    → real, working example tool
tools/_tool-template.html  → blank template — copy this for every new tool
blog/index.html            → guides/articles index
blog/_post-template.html   → blank template — copy this for every new post
assets/css/style.css       → all styles (single file, no framework)
assets/js/main.js          → theme toggle + homepage search (~70 lines)
404.html, robots.txt, sitemap.xml
```

## Adding a new tool (manually or via n8n)

1. Copy `tools/_tool-template.html` → `tools/your-tool-name.html`.
2. Replace the `[[BRACKETED_PLACEHOLDERS]]` — same find/replace pattern you
   already use for the Blogger `#post-desc` injection.
3. Add the tool's actual logic inside the `<script>` at the bottom of the
   page — keep it self-contained per page (no shared JS bundle), so pages
   stay independent and fast on their own.
4. Add one `<a class="tool-card">` block to `index.html`'s tool grid.
5. Add the URL to `sitemap.xml`.

Adding a blog/glossary post follows the same pattern with
`blog/_post-template.html`.

## Automating uploads with n8n (matches your existing pattern)

GitHub's REST API lets you create/update a file directly:

```
PUT https://api.github.com/repos/{owner}/{repo}/contents/{path}
Headers: Authorization: Bearer <token>
Body: { "message": "add tool: x", "content": "<base64-encoded file>", "branch": "main" }
```

An n8n HTTP Request node (GET file first if it exists, to get its `sha`,
then PUT) can push generated HTML straight into `/tools/` or `/blog/` —
the same shape as your Blogger API push, just a different endpoint.
GitHub Pages auto-publishes on every push to the Pages branch, usually
within under a minute.

## Performance choices (why it's fast)

- Body text uses the OS system font stack (`system-ui`) — zero font
  requests. Only headings load one optional Google Font; delete that
  `<link>` tag in every page + the `--font-display` line in `style.css`
  for zero external requests at all.
- One CSS file, one JS file, no framework (no Bootstrap/Tailwind CDN).
- No images in the starter, so there's nothing to optimize yet — when you
  add images, use `loading="lazy"` and a compressed format (WebP/AVIF).
- No client-side router, no hydration, no JS framework runtime.

## Theme

Colors and fonts are CSS variables at the top of `assets/css/style.css`
(`:root` for light, `[data-theme="dark"]` for dark). Change the palette in
one place and it updates everywhere. A dark/light toggle is already wired
up in `assets/js/main.js`.

## License

MIT — see `LICENSE`. Use it for anything, commercial included, no
attribution required.
