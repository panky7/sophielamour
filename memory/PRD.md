# Sophie Lamour - Life Coaching Website PRD

## Original Problem Statement
Build a modern, elegant, SEO-optimised life coaching website for Sophie Lamour. French (primary) with English toggle. Non-technical admin panel for blogs and testimonials. Blue gradient color palette. Embedded Calendly, WhatsApp contact button, Google Maps (Chateau-Landon 77570), Rich Text Editor for blog creation.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Auth**: JWT (httpOnly cookies) with bcrypt password hashing
- **Rich Text**: Vanilla Quill 2.x (mounted via useRef, React 19 concurrent-safe)
- **i18n**: Custom LanguageContext (FR/EN toggle)

## What's Been Implemented
- Multi-page site: Home, About, Services (4 sub-pages), Blog, Testimonials, Appointment, Contact
- French/English language toggle
- Blue gradient color palette (#03045E to #CAF0F8)
- Admin panel: Login, Dashboard, Blog Editor (WYSIWYG), Testimonial Editor
- Blog CRUD with rich text editor (create + edit)
- Testimonials CRUD (create + edit)
- WhatsApp floating contact button (+33 689844778)
- Google Maps embed (Chateau-Landon 77570)
- Contact form with backend storage
- SEO: Helmet meta tags on all pages

## Completed Bug Fixes
- [2026-04-05] Fixed react-quill crash (findDOMNode removed in React 19) — replaced with react-quill-new
- [2026-04-05] Fixed Helmet <title> tags across all pages (single string children)
- [2026-04-05] Fixed blog edit — added edit routes, edit mode in BlogEditor/TestimonialEditor
- [2026-04-05] Fixed React 19 concurrent rendering error — replaced ReactQuill component with vanilla Quill via useRef
- [2026-04-05] Fixed rich text formatting loss on edit — use clipboard.dangerouslyPasteHTML() instead of innerHTML
- [2026-04-05] Cleaned up dead files (HomeOnePage.js, BlogEditor.js.backup), removed StrictMode

## P0 — None (all critical bugs resolved)

## P1 — Upcoming
- Calendly integration: Replace generic appointment form with embedded Calendly widget (needs valid Calendly URL from user)

## P2 — Backlog
- Social media auto-posting for blogs (OAuth/Zapier)
- Social media feed sync on homepage
- Backend refactoring: split server.py into route modules

## Key Endpoints
- POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
- GET/POST /api/blog/posts, GET/PUT/DELETE /api/blog/posts/:id
- GET/POST /api/testimonials, PUT/DELETE /api/testimonials/:id
- POST /api/contact, GET /api/contact/requests

## Admin Credentials
- Email: admin@sophielamour.com
- Password: SophieAdmin2025!
