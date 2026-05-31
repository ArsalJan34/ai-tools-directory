# Project: AI Tools Directory

ai-tools-directory/
│
├── 📁 app/ # Next.js App Router
│ ├── layout.tsx # Root layout (navbar, footer, analytics)
│ ├── page.tsx # Homepage (hero, featured tools, categories)
│ ├── globals.css # Global styles + Tailwind imports
│ │
│ ├── 📁 (auth)/ # Auth route group
│ │ ├── login/page.tsx
│ │ └── register/page.tsx
│ │
│ ├── 📁 tools/ # Tools section
│ │ ├── page.tsx # All tools listing (filterable, searchable)
│ │ └── [slug]/page.tsx # Individual tool detail page
│ │
│ ├── 📁 category/
│ │ └── [slug]/page.tsx # Category page (e.g. /category/writing)
│ │
│ ├── 📁 submit/
│ │ └── page.tsx # Submit a tool form
│ │
│ ├── 📁 blog/ # SEO content / tutorials
│ │ ├── page.tsx # Blog index
│ │ └── [slug]/page.tsx # Individual blog post
│ │
│ ├── 📁 compare/
│ │ └── page.tsx # Tool comparison page
│ │
│ ├── 📁 admin/ # Protected admin panel
│ │ ├── layout.tsx # Admin layout with sidebar
│ │ ├── page.tsx # Dashboard (stats, pending tools)
│ │ ├── tools/page.tsx # Manage all tools (approve/reject/edit)
│ │ ├── categories/page.tsx # Manage categories
│ │ ├── sponsored/page.tsx # Manage sponsored listings
│ │ └── analytics/page.tsx # Revenue, clicks, affiliate stats
│ │
│ └── 📁 api/ # API Routes
│ ├── tools/route.ts # GET all tools, POST new tool
│ ├── tools/[id]/route.ts # GET, PUT, DELETE single tool
│ ├── categories/route.ts # GET all categories
│ ├── search/route.ts # Search endpoint
│ ├── submit/route.ts # Tool submission handler
│ ├── click/[toolId]/route.ts # Affiliate click tracker
│ └── admin/
│ ├── approve/route.ts # Approve submitted tools
│ └── stats/route.ts # Analytics data
│
├── 📁 components/ # Reusable UI components
│ │
│ ├── 📁 layout/
│ │ ├── Navbar.tsx # Top navigation + search bar
│ │ ├── Footer.tsx # Footer with links, newsletter
│ │ └── Sidebar.tsx # Category filter sidebar
│ │
│ ├── 📁 ui/ # Base UI primitives
│ │ ├── Button.tsx
│ │ ├── Badge.tsx # Category/tag badges
│ │ ├── Card.tsx
│ │ ├── Input.tsx
│ │ ├── Modal.tsx
│ │ ├── Skeleton.tsx # Loading skeletons
│ │ └── Toast.tsx
│ │
│ ├── 📁 tools/
│ │ ├── ToolCard.tsx # Tool card (used in grid listings)
│ │ ├── ToolGrid.tsx # Grid of tool cards
│ │ ├── ToolFilters.tsx # Filter bar (category, pricing, rating)
│ │ ├── ToolDetail.tsx # Full tool detail view
│ │ ├── ToolBadge.tsx # "Sponsored", "New", "Featured" badges
│ │ └── ToolCompareTable.tsx # Side-by-side comparison table
│ │
│ ├── 📁 search/
│ │ ├── SearchBar.tsx # Global search input
│ │ ├── SearchResults.tsx # Search results dropdown/page
│ │ └── SearchFilters.tsx # Advanced search filters
│ │
│ ├── 📁 home/
│ │ ├── Hero.tsx # Homepage hero section
│ │ ├── CategoryGrid.tsx # Visual category selector
│ │ ├── FeaturedTools.tsx # Featured/sponsored tools row
│ │ ├── NewTools.tsx # Recently added tools
│ │ └── NewsletterSignup.tsx # Email capture
│ │
│ └── 📁 ads/
│ ├── BannerAd.tsx # Display ad slots
│ └── SponsoredCard.tsx # Sponsored tool highlight
│
├── 📁 lib/ # Utilities and helpers
│ ├── supabase.ts # Supabase client setup
│ ├── supabase-admin.ts # Supabase admin client (server-side)
│ ├── algolia.ts # Algolia search client
│ ├── affiliate.ts # Affiliate link builder + tracker
│ ├── seo.ts # SEO metadata helpers
│ ├── utils.ts # General utilities (slugify, formatDate)
│ └── validations.ts # Zod schemas for forms/API
│
├── 📁 hooks/ # Custom React hooks
│ ├── useSearch.ts # Search state + debounce
│ ├── useFilters.ts # Filter state management
│ ├── useTools.ts # Fetch tools with SWR/React Query
│ └── useAdmin.ts # Admin auth check
│
├── 📁 types/ # TypeScript type definitions
│ ├── tool.ts # Tool interface
│ ├── category.ts # Category interface
│ ├── user.ts # User/admin interface
│ └── affiliate.ts # Affiliate click/stats types
│
├── 📁 data/ # Static/seed data
│ ├── categories.ts # Initial categories list
│ ├── seed-tools.ts # 50–100 tools to seed the DB
│ └── pricing-types.ts # Free, Freemium, Paid, etc.
│
├── 📁 content/ # MDX blog posts (or use CMS)
│ ├── best-ai-writing-tools-2025.mdx
│ ├── chatgpt-vs-claude.mdx
│ └── how-to-use-midjourney.mdx
│
├── 📁 public/ # Static assets
│ ├── 📁 logos/ # Tool logos (png/svg)
│ ├── 📁 icons/ # Category icons
│ ├── 📁 og/ # Open Graph images
│ ├── favicon.ico
│ ├── robots.txt
│ └── sitemap.xml # Auto-generated or static
│
├── 📁 styles/
│ └── theme.css # Custom CSS variables, fonts
│
├── 📁 scripts/ # One-time or cron scripts
│ ├── seed-database.ts # Populate DB with initial tools
│ ├── generate-sitemap.ts # Auto-generate sitemap
│ └── sync-algolia.ts # Push DB tools to Algolia index
│
├── 📁 supabase/ # Supabase local config
│ ├── 📁 migrations/
│ │ ├── 001_create_tools.sql
│ │ ├── 002_create_categories.sql
│ │ ├── 003_create_clicks.sql
│ │ └── 004_create_submissions.sql
│ └── seed.sql
│
├── .env.local # Environment variables
├── .env.example # Template for env vars
├── next.config.ts # Next.js config
├── tailwind.config.ts # Tailwind config
├── tsconfig.json
├── package.json
└── README.md

## Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase

## Goal:

A searchable directory of AI tools. Monetized with affiliate links,
sponsored listings. Simple, fast, complete.

## Completed So Far:

- [x] Next.js project created
- [x] Supabase database set up
- [x] Tables: tools, categories, clicks, submissions
- [x] Seed data: 8 categories, 8 tools added
- [x] Supabase client created at app/lib/supabase.ts
- [x] .env.local configured
- [x] Homepage built (hero, categories, featured tools, footer)
- [x] Navbar and Footer components created
- [x] app/components/Navbar.tsx
- [x] app/components/Footer.tsx
- [x] app/page.tsx (homepage)
- [x] app/globals.css (dark theme)
- [x] All tools listing page → app/tools/page.tsx
- [x] Tool detail page → app/tools/[slug]/page.tsx

## File Structure So Far:

ai-tools-directory/
├── app/
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ ├── tools/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── .env.local
├── CONTEXT.md
└── package.json

## Next Task:

Category pages → app/category/[slug]/page.tsx

## Completed So Far:

- [x] Next.js project created
- [x] Supabase database set up
- [x] Homepage built
- [x] Navbar and Footer components
- [x] All tools listing page → app/tools/page.tsx
- [x] Tool detail page → app/tools/[slug]/page.tsx
- [x] Category page → app/category/[slug]/page.tsx
- [x] Submit a tool page → app/submit/page.tsx

## File Structure So Far:

ai-tools-directory/
├── app/
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ ├── tools/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── category/
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── submit/
│ │ └── page.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── .env.local
├── CONTEXT.md
└── package.json

## Next Task:

Deploy to Vercel + Admin panel

## Completed So Far:

- [x] Next.js project created
- [x] Supabase database set up
- [x] Homepage built
- [x] Navbar and Footer components
- [x] All tools listing page
- [x] Tool detail page
- [x] Category pages
- [x] Submit a tool page
- [x] Deployed to Vercel
- [x] Admin panel → app/admin/
- [x] Admin dashboard with stats
- [x] Admin manage tools with add/delete/feature/sponsor
- [x] Admin submissions with approve/reject

## File Structure So Far:

ai-tools-directory/
├── app/
│ ├── admin/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── tools/
│ │ │ └── page.tsx
│ │ └── submissions/
│ │ └── page.tsx
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ ├── tools/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── category/
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── submit/
│ │ └── page.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── .env.local
├── CONTEXT.md
└── package.json

## Next Task:

Affiliate click tracking API route

## Completed So Far:

- [x] Next.js project created
- [x] Supabase database set up
- [x] Homepage built
- [x] Navbar and Footer components
- [x] All tools listing page
- [x] Tool detail page
- [x] Category pages
- [x] Submit a tool page
- [x] Deployed to Vercel
- [x] Admin panel complete
- [x] Affiliate click tracking → app/api/click/[toolId]/route.ts
- [x] All Visit buttons now track clicks before redirecting

## Next Task:

SEO setup and sitemap

## Completed So Far:

- [x] Next.js project created
- [x] Supabase database set up
- [x] Homepage built
- [x] Navbar and Footer components
- [x] All tools listing page
- [x] Tool detail page
- [x] Category pages
- [x] Submit a tool page
- [x] Deployed to Vercel
- [x] Admin panel complete
- [x] Affiliate click tracking
- [x] SEO metadata on all pages
- [x] Sitemap at /sitemap.xml
- [x] Robots.txt at /robots.txt
- [x] Blog section with 6 posts

## File Structure So Far:

ai-tools-directory/
├── app/
│ ├── admin/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── tools/page.tsx
│ │ └── submissions/page.tsx
│ ├── api/
│ │ └── click/
│ │ └── [toolId]/
│ │ └── route.ts
│ ├── blog/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── category/
│ │ └── [slug]/page.tsx
│ ├── components/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── submit/page.tsx
│ ├── tools/
│ │ ├── page.tsx
│ │ └── [slug]/page.tsx
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── robots.ts
│ └── sitemap.ts
├── .env.local
├── CONTEXT.md
└── package.json

## Next Task:

Final touches and submit site to Google Search Console

## SITE IS COMPLETE ✅

## All Pages:

- / Homepage
- /tools All tools listing
- /tools/[slug] Tool detail
- /category/[slug] Category page
- /categories All categories
- /blog Blog index
- /blog/[slug] Blog post
- /submit Submit a tool
- /advertise Advertise page
- /admin Admin dashboard
- /admin/tools Manage tools
- /admin/submissions Manage submissions
- /api/click/[toolId] Click tracking

## Stack:

Next.js 14, TypeScript, Tailwind CSS, Supabase

## Deployed: Vercel

## Google Search Console: submitted
