# Portfolio Monorepo - Setup & Usage Guide

## What's Been Built

A complete **3-part portfolio system** with full content management:

```
personal-portfolio/
├── packages/
│   ├── api/              Express backend (localhost:3000)
│   ├── portfolio/        React SPA (GitHub Pages)
│   └── cms/              Next.js admin UI (localhost:3001)
├── data/                 SOURCE OF TRUTH (JSON files)
└── scripts/              Build utilities
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start All Services (3 Terminal Tabs)

**Tab 1 - API (localhost:3000)**
```bash
npm run dev:api
```

**Tab 2 - Portfolio (localhost:5173)**
```bash
npm run dev:portfolio
```

**Tab 3 - CMS (localhost:3001)**
```bash
npm run dev:cms
```

### 3. Edit Content
1. Open **http://localhost:3001** (CMS)
2. Edit profile, projects, skills, experience, blog, or contact
3. Click **Deploy** button to save changes
   - This commits data/ changes and pushes to GitHub
   - GitHub Actions automatically builds and deploys to GitHub Pages

## Data Flow

```
CMS UI (localhost:3001)
    ↓
Express API (localhost:3000)
    ↓
data/*.json (source of truth)
    ↓
git commit + git push
    ↓
GitHub Actions
    ↓
React SPA built & deployed to GitHub Pages
```

## File Structure

### Data Layer (`data/`)
- `profile.json` — Personal info, social links, resume
- `projects.json` — Portfolio projects
- `skills.json` — Skill categories with proficiency levels
- `experience.json` — Work history with highlights
- `blog.json` — Blog posts (published/draft)
- `contact.json` — Contact preferences, form settings

### API Routes (`packages/api/src/routes/`)
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/profile` | GET/PUT | Profile settings |
| `/api/skills` | GET/PUT | Skills & categories |
| `/api/contact` | GET/PUT | Contact info |
| `/api/projects` | GET/POST/PUT/DELETE | Project CRUD |
| `/api/experience` | GET/POST/PUT/DELETE | Experience CRUD |
| `/api/blog` | GET/POST/PUT/DELETE | Blog post CRUD |
| `/api/deploy` | POST | Trigger GitHub deployment |

### CMS Pages (`packages/cms/src/app/`)
- `/` — Dashboard
- `/profile` — Edit profile
- `/projects` — List & edit projects
- `/skills` — Manage skill categories
- `/experience` — Manage work history
- `/blog` — Manage blog posts
- `/contact` — Configure contact settings

### Portfolio Sections (`packages/portfolio/src/`)
- `components/layout/` — Navbar, Footer
- `components/sections/` — Hero, Projects, Skills, Experience, Blog, Contact
- `components/ui/` — Reusable cards & components
- `hooks/useData.ts` — Load JSON data from `src/data/`

## Key Features

✅ **Type-Safe** — Full TypeScript across all packages
✅ **Modular** — NPM workspaces for independent packages
✅ **Git-Driven** — Content stored in git, deployment via Actions
✅ **No Backend Database** — Pure JSON files, version controlled
✅ **Styled** — Tailwind CSS with responsive design
✅ **Forms** — Full CRUD forms in Next.js CMS
✅ **Accessible** — Semantic HTML, keyboard navigation

## Next Steps (Optional Enhancements)

### Phase 6 - Polish
- [ ] Dark mode toggle
- [ ] Scroll animations
- [ ] Individual blog post pages with markdown rendering
- [ ] Image upload to storage service
- [ ] Add robots.txt and sitemap
- [ ] SEO meta tags per page
- [ ] Email validation and Formspree integration

### Deployment
1. Push to GitHub
2. Enable GitHub Pages in Settings → Pages → Deploy from Branch (gh-pages)
3. Update site URL in GitHub Pages settings
4. GitHub Actions runs automatically on push
5. Site available at: `https://username.github.io/personal-portfolio/`

## Development Notes

- **API CORS** — Restricted to `http://localhost:3001` only
- **Data Copy** — Automatic via `scripts/copy-data.mjs` before builds
- **Vite Base Path** — Set to `/personal-portfolio/` for GitHub Pages
- **Git Deploy** — Uses local git credentials; no setup needed
- **Hot Reload** — All packages support HMR in dev mode

## Troubleshooting

**API not responding?**
```bash
npm run dev:api
# Should show: ✓ API running on http://localhost:3000
```

**CMS can't connect to API?**
- Check API is running on localhost:3000
- Verify CORS in `packages/api/src/index.ts`

**Portfolio doesn't load data?**
```bash
# Make sure copy-data script ran
node scripts/copy-data.mjs
# Should create packages/portfolio/src/data/*.json
```

**Git deploy fails?**
- Ensure git is configured locally
- Check you have push permissions to the repo
- Verify main branch exists and is checked out

---

**Happy building!** 🚀 Your portfolio is ready to showcase your work.
