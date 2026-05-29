# AEDI — Automated Electronic Design Initiative

A Next.js 15 + TypeScript + Tailwind CSS landing website with an AI-powered Concept Demo.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles + CSS variables
│   └── demo/
│       ├── layout.tsx      # Demo page layout
│       └── page.tsx        # AI-powered concept demo
├── components/
│   ├── Navbar.tsx          # Responsive navigation
│   ├── HeroSection.tsx     # Hero with parallax orbs
│   ├── Sections.tsx        # Vision, Engine, Scope, Impact, Contact
│   ├── LeadershipSection.tsx  # Team section wrapper
│   ├── TeamGrid.tsx        # Team cards + profile modals
│   ├── FadeUp.tsx          # Scroll-triggered fade animation
│   └── ScrollToTop.tsx     # Floating scroll-to-top button
├── lib/
│   ├── data.ts             # All editable content data
│   └── types.ts            # TypeScript interfaces
public/
└── images/                 # All site images
```

## ✏️ How to Edit Content

All text content, team members, workflow steps, scope items, and stats live in **`src/lib/data.ts`**.

- **Change colors** → edit CSS variables in `src/app/globals.css` (`:root` block)
- **Add/remove team members** → edit `TEAM_MEMBERS` in `src/lib/data.ts`
- **Edit workflow** → edit `WORKFLOW_STEPS` in `src/lib/data.ts`
- **Edit impact stats** → edit `IMPACT_STATS` in `src/lib/data.ts`
- **Edit scope** → edit `SCOPE_ITEMS` in `src/lib/data.ts`

## 🤖 Concept Demo

The `/demo` page uses the **Anthropic API** directly from the browser.

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Paste it in the API key field at the top of the demo page
3. Click any demo prompt or type your own battery pack requirements

## 🛠️ Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint code
```

## 📦 Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Anthropic API** (demo AI)
