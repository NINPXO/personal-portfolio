# Personal Portfolio — 3-Part Monorepo

A full-stack portfolio system with integrated content management, built with **React + Vite**, **Next.js**, and **Express**.

## 📁 Repository Structure

```
├── data/                    # SOURCE OF TRUTH for all content (JSON files)
│   ├── profile.json
│   ├── projects.json
│   ├── skills.json
│   ├── experience.json
│   ├── blog.json
│   └── contact.json
├── packages/
│   ├── portfolio/          # React + Vite SPA → GitHub Pages
│   ├── cms/                # Next.js admin UI (localhost:3001)
│   └── api/                # Express backend (localhost:3000)
└── .github/workflows/
    └── deploy.yml          # GitHub Actions: build + deploy to gh-pages
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run All Packages in Development
```bash
# Start all dev servers
npm run dev

# Or run individually:
npm run dev:api        # localhost:3000
npm run dev:portfolio  # localhost:5173
npm run dev:cms        # localhost:3001
```

### Build for Production
```bash
npm run build
npm run build:portfolio  # Builds portfolio SPA for GitHub Pages
```

## 📊 Data Flow

**CMS** (localhost:3001) → **API** (localhost:3000) → **data/*.json** (git commit + push) → **GitHub Actions** → **GitHub Pages**

All content is stored in JSON files in the `data/` directory. The CMS provides a UI to edit content, which is persisted via the API and automatically deployed to GitHub Pages when pushed.

## 📦 Packages

### `packages/portfolio`
React + Vite single-page application deployed to GitHub Pages.
- **Start dev**: `npm run dev:portfolio`
- **Build**: `npm run build:portfolio`
- **Live URL**: `https://<username>.github.io/personal-portfolio/`

### `packages/cms`
Next.js admin interface for managing portfolio content.
- **Start dev**: `npm run dev:cms`
- **URL**: `http://localhost:3001`

### `packages/api`
Express backend server managing JSON files and git deployments.
- **Start dev**: `npm run dev:api`
- **URL**: `http://localhost:3000`

## 🔧 Environment Setup

No environment variables required for local development. The API uses local git credentials for deployments.

## 🌐 Live Deployment

The portfolio is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. The site should be live at: `https://NINPXO.github.io/personal-portfolio/`

Last deployment: February 2026

## 📖 Documentation

See individual `README.md` files in each package for detailed documentation.
