# Right Ads website

Responsive single-page site for Right Ads, including a Three.js product preview, click-to-call links, WhatsApp inquiry brief builder, the supplied service reference images, and the Right Ads logo.

The language buttons switch between English (default), Hindi, and Telugu. The selection is remembered in the visitor’s browser. The 3D selector contains all 16 service previews across the four service groups. The responsive layout supports Android and iOS phone browsers as well as tablets and desktop screens.

## Preview

Serve this folder locally (ES modules do not run directly from a `file://` page). Node.js is required. Open PowerShell here, run `node local-preview-server.js`, then visit `http://localhost:8000/index.html`.

## Host it free with GitHub Pages

1. Sign in to GitHub and create a **public** repository. GitHub Free requires a public repository for Pages.
2. Upload the *contents* of this folder so `index.html` is at the repository root. Include `styles.css`, `js/`, and `assets/`.
3. Open the repository’s **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. When GitHub Pages finishes publishing, use the site address shown on the Pages settings screen. It will look like `https://your-name.github.io/repository-name/`.

GitHub’s guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site. Because the repository is public, all website files and photos in it will be public too.

## Update contact details and social links

Edit `js/site-config.js`. The call button uses `phone`; WhatsApp uses `whatsapp`. Add Instagram, Facebook, and LinkedIn URLs to the `social` fields when available.

## Add photos of completed Right Ads projects

1. Copy your project photos into `assets/` (for example, `assets/right-ads-hoarding-01.jpg`).
2. To update a category cover image, set `serviceImages.outdoor`, `serviceImages.signage`, `serviceImages.stationery`, or `serviceImages.promotion` in `js/site-config.js` to that path.
3. To add or replace a photo in the image library, update the matching `<img src="./assets/...">` and caption in the `reference-grid` in `index.html`.

The supplied image library contains reference examples provided for this page. It is not presented as proof that Right Ads completed those projects. Replace these with your own photos as they become available.

The 3D preview loads Three.js from jsDelivr, with a CSS mockup fallback if the library cannot load. The social profile links can be set in `js/site-config.js` when ready.

## Voice guide

The floating voice-help control can read a short guide in the selected English, Hindi, or Telugu language. Voice commands can jump to services or the gallery, open the 3D preview for a named service, or start a call or WhatsApp message. The visitor must tap the microphone button and grant microphone permission. Voice recognition depends on browser/device support and a secure page (HTTPS or localhost); where it is unavailable, the spoken guide and manual links remain available.

To update translations or service names, edit `js/translations.js` and `js/catalog.js` respectively.
