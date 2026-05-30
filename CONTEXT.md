# Project: AI Tools Directory

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

## File Structure So Far:

ai-tools-directory/
├── app/
│ ├── lib/
│ │ └── supabase.ts
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── .env.local
├── CONTEXT.md
├── tailwind.config.ts
└── package.json

## Database Tables:

- tools (id, name, slug, tagline, description, url, affiliate_url,
  logo_url, category_id, pricing_type, is_featured, is_new, tags)
- categories (id, name, slug, icon, description, tool_count)
- clicks (id, tool_id, created_at)
- submissions (id, name, url, description, email, status)

## Current Task:

Starting homepage UI
