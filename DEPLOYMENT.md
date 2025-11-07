# Deployment Guide

This guide covers multiple deployment options for the O-Line Training App.

## Option 1: Vercel (Recommended - Easiest)

Vercel is perfect for Vite/React apps and offers free hosting with automatic deployments.

### Method A: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (your account)
   - Link to existing project? No
   - Project name? (accept default or customize)
   - Directory? ./ (press Enter)
   - Override settings? No

4. **Your app is live!** Vercel will give you a URL like `https://lifting-gaps.vercel.app`

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Method B: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `Lifting-Gaps` repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"
7. Done! Your app is live

**Automatic Deployments:** Every push to your main branch automatically deploys.

---

## Option 2: Netlify

Netlify is another excellent option with drag-and-drop deployment.

### Method A: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your app:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy
   ```

4. **For production:**
   ```bash
   netlify deploy --prod
   ```

### Method B: Netlify Dashboard (Drag & Drop)

1. Build your app locally:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Sign in
4. Drag the `dist` folder onto the deployment zone
5. Your app is live!

### Method C: Netlify Git Integration

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your `Lifting-Gaps` repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Setup:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/Lifting-Gaps",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/Lifting-Gaps/',
     server: {
       port: 3000,
       host: true
     }
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

Your app will be live at `https://yourusername.github.io/Lifting-Gaps`

---

## Option 4: Render

Free hosting with automatic deployments from Git.

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. New → Static Site
4. Connect your repository
5. Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Create Static Site

---

## Recommended Workflow

**For this project, I recommend Vercel because:**
- ✅ Zero configuration needed
- ✅ Automatic deployments from Git
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Preview deployments for branches
- ✅ Perfect for Vite/React apps

## Quick Deploy (Vercel - 1 Minute Setup)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (run from project root)
vercel

# Deploy to production
vercel --prod
```

That's it! Your app is live with automatic HTTPS and CDN distribution.

---

## Post-Deployment

After deployment, your app will have:
- ✅ Live URL (e.g., `https://your-app.vercel.app`)
- ✅ HTTPS/SSL certificate
- ✅ Automatic deployments on git push
- ✅ Preview URLs for branches/PRs
- ✅ Global CDN for fast loading
- ✅ All data stored locally in users' browsers

## Custom Domain (Optional)

All hosting platforms support custom domains:

1. **Buy a domain** (e.g., from Namecheap, Google Domains)
2. **Add to your hosting platform:**
   - Vercel: Settings → Domains → Add
   - Netlify: Domain settings → Add custom domain
3. **Update DNS records** as instructed
4. **Wait for DNS propagation** (5 min - 48 hours)

Example custom domain: `olinetraining.com` or `training.yourname.com`

---

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 on refresh
- Ensure rewrites are configured (already done in `vercel.json` and `netlify.toml`)

### Data not persisting
- The app uses localStorage, which is browser-specific
- Remind users to export data for backups

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html
