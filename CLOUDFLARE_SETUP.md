# CALLNIVO AI — GitHub & Cloudflare Pages Deployment Guide

This beginner-friendly guide walks you step-by-step through uploading your **CALLNIVO AI** Angular source code to **GitHub** and deploying it live on **Cloudflare Pages**.

```
Local Angular Project (CALLNIVO_GITHUB_UPLOAD)
                     │
                     ▼
             GitHub Repository
                     │
                     ▼
             Cloudflare Pages
                     │
                     ▼
        Live CALLNIVO AI Website
```

---

## 1. How to Create a GitHub Repository

1. Go to [https://github.com](https://github.com) and sign in to your account.
2. Click the **`+`** icon in the top-right corner and select **New repository**.
3. Enter a **Repository name**, for example: `callnivo-ai-website`.
4. Choose **Private** (recommended) or **Public**.
5. **Important**: Leave **"Add a README file"**, **"Add .gitignore"**, and **"Choose a license"** **UNCHECKED** so the repository starts completely empty (your project already includes `README.md` and `.gitignore`).
6. Click **Create repository**.

---

## 2. How to Upload the Contents of `CALLNIVO_GITHUB_UPLOAD`

We have prepared a clean, ready-to-upload folder located at:
`d:\Antigravity Projects\CALLNIVO_GITHUB_UPLOAD`

This folder has **fewer than 100 files** and every individual file is **under 20 MiB** (well below GitHub's 25 MiB browser upload limit), and `node_modules`, `.angular`, and `dist` have already been excluded.

### Option A: Browser Drag-and-Drop Upload (Simplest)
1. On your newly created empty GitHub repository page, click the link **"uploading an existing file"**.
2. Open File Explorer on your computer and go **inside** the `d:\Antigravity Projects\CALLNIVO_GITHUB_UPLOAD` folder.
3. Select **all files and folders inside** `CALLNIVO_GITHUB_UPLOAD` (`Ctrl + A`) — such as `package.json`, `angular.json`, `src`, `public`, `README.md`, `CLOUDFLARE_SETUP.md`, etc.
4. Drag and drop them onto the GitHub upload area in your browser.
5. Wait until all files finish uploading in the list.
6. At the bottom of the page, under **Commit changes**, type `Initial commit: CALLNIVO AI Angular website`.
7. Make sure **"Commit directly to the `main` branch"** is selected, then click **Commit changes**.

### Option B: Using GitHub Desktop (If You Prefer a Desktop App)
1. Download and open [GitHub Desktop](https://desktop.github.com/).
2. Click **File** -> **Add local repository** -> choose `d:\Antigravity Projects\CALLNIVO_GITHUB_UPLOAD`.
3. If prompted to initialize a Git repository, click **Create a repository** -> **Publish repository** to GitHub.

---

## 3. How to Keep the Angular Source Files at the Repository Root

> **CRITICAL RULE**: Do **NOT** drag the outer `CALLNIVO_GITHUB_UPLOAD` folder itself into GitHub. Open `CALLNIVO_GITHUB_UPLOAD` first and drag the **contents inside it**.

When you view your GitHub repository after uploading, you should immediately see these files at the **top level (root)** of the repository:
- `angular.json`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.spec.json`
- `README.md`
- `CLOUDFLARE_SETUP.md`
- `public/` (containing `assets/videos/hero-desktop.mp4`, `assets/videos/hero-mobile.mp4`, `assets/videos/callnivo-explainer.mp4`, `assets/images/callnivo-explainer-poster.jpg`, `_redirects`, etc.)
- `src/` (containing `main.ts`, `index.html`, `styles.scss`, and `app/`)

If `package.json` and `angular.json` are at the root of your repository, Cloudflare Pages will find and build your project automatically.

---

## 4. How to Create a Cloudflare Pages Project

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, click **Workers & Pages** (or **Compute (Workers)** -> **Workers & Pages**).
3. Click the **Create** button.
4. Switch to the **Pages** tab at the top.

---

## 5. How to Connect the GitHub Repository

1. Under **Import an existing Git repository**, click **Connect to Git** (or **Get started**).
2. Select **GitHub** and authorize Cloudflare Pages to access your GitHub account.
3. Choose your `callnivo-ai-website` repository and click **Begin setup**.

---

## 6. Exact Cloudflare Pages Build Settings (Steps 6–11)

On the **Set up builds and deployments** screen, enter the following exact settings verified for this Angular 19 project:

| Setting | Exact Value to Use | Why |
| :--- | :--- | :--- |
| **6. Framework preset** | **Angular** *(or **None** — both work identically when you enter the command & output path below)* | Configures static SPA asset serving. |
| **7. Build command** | `npm run build` | Runs `ng build` in production mode. |
| **8. Build output directory** | `dist/callnivo-ai/browser` | **Verified exact path** where Angular 19 outputs `index.html`, JS bundles, and `assets/`. |
| **9. Root directory (advanced)** | Leave **blank / `/` (default)** | Because `package.json` and `angular.json` are at the repository root. |
| **10. Environment variables (Node.js version)** | Click **Add variable**:<br>Variable name: `NODE_VERSION`<br>Value: `22` | Angular 19 requires Node.js 20 or 22 (`22` is recommended). |
| **11. Production branch** | `main` | Deploys automatically whenever changes are committed to `main`. |

---

## 12. How to Deploy the Website

1. Double-check that **Build command** is `npm run build`, **Build output directory** is `dist/callnivo-ai/browser`, and `NODE_VERSION` is set to `22`.
2. Click **Save and Deploy**.
3. Cloudflare Pages will clone your GitHub repository, run `npm install`, execute `npm run build`, and publish the contents of `dist/callnivo-ai/browser`.
4. The first build typically takes **1 to 3 minutes**.

---

## 13. How to Access the `*.pages.dev` Website URL

1. Once the build status changes to **Success**, Cloudflare displays your live preview URL at the top of the deployment page (for example, `https://callnivo-ai-website.pages.dev`).
2. Click that link to open your live **CALLNIVO AI** website and test the hero background videos, the **"See CALLNIVO AI in Action"** explainer video player, the **ElevenLabs Live AI Receptionist widget** (`agent_0601m68zdzdffeb8g65h4gk3jpf8` in the bottom-left corner), and the **WhatsApp contact button** (in the bottom-right corner).
3. **Important ElevenLabs Security Allowlist Step**:
   - In your ElevenLabs agent dashboard (`agent_0601m68zdzdffeb8g65h4gk3jpf8`), ensure **Widget Access** is enabled, **Authentication** is disabled for public web embedding, and add your Cloudflare Pages hostname (e.g. `callnivo-ai-website.pages.dev` and your custom domain) to the **Allowed Hostnames / Security Allowlist** so live voice sessions are permitted on your live URL.

---

## 14. How to Connect a Custom Domain Later

When you are ready to connect your own domain (such as `callnivo.ai`):

1. Open your project inside **Cloudflare Workers & Pages**.
2. Click the **Custom domains** tab at the top.
3. Click **Set up a custom domain**.
4. Type your domain (e.g., `callnivo.ai`) and click **Continue**.
5. If your domain is on Cloudflare DNS, click **Activate domain** — Cloudflare will automatically create the DNS record and issue a free SSL certificate.
6. You can repeat the same step for `www.callnivo.ai`.

---

## 15. How to Publish Future Website Updates Through New GitHub Commits

Because Cloudflare Pages is connected to your GitHub repository's `main` branch, **every future commit automatically triggers a new deployment**:

- **To edit a configuration value directly on GitHub**:
  1. Open your repository on GitHub and navigate to `src/app/config/integrations.config.ts` (for example, to add your ElevenLabs `elevenLabsAgentId` or Cal.com `calComBookingUrl`).
  2. Click the **pencil icon (Edit this file)** in the top-right corner.
  3. Make your change and click **Commit changes...** -> **Commit directly to the `main` branch**.
  4. Cloudflare Pages will automatically detect the commit, rebuild the Angular app in ~1–2 minutes, and update your live website with zero downtime.

- **To replace a file on GitHub**:
  1. Navigate to the folder in your GitHub repository (such as `public/assets/videos/`).
  2. Click **Add file** -> **Upload files**, drag the updated file in, and click **Commit changes**.
