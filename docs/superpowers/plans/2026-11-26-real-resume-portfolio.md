# Real Resume Portfolio Redesign Implementation Plan

> **For agentic workers:** Execute the plan task-by-task in the current session. Steps use checkbox syntax for tracking.

**Goal:** Replace the dated resume page with a crafted, responsive static portfolio built entirely from verified information and local assets.

**Architecture:** Keep the existing plain HTML/CSS/JavaScript stack. Add a small content module for resume data and a focused script for navigation, accessible disclosure/lightbox behavior, active-section state, and progressive scroll reveals; no build framework or package installation. Preserve local resume/transcript files and live external links.

**Tech Stack:** Semantic HTML5, CSS3, vanilla JavaScript, Node.js built-ins for static structure/link/invariant tests; existing local PNG/JPG/PDF assets.

**Spec:** `C:\Users\Dell\AppData\Roaming\Manus\uploads\ZVRZZcHMzgQdHAxUL8lDdB\cATmAr2iJNunaW0H3xUpIe\1-pasted_content.txt` and the real resume source in `index.html`, `project.txt`.

## Global Constraints

- Use the real name, work/education history, skills, links, PDFs, and screenshots; do not invent claims, availability, or certifications.
- Target an experience-led developer portfolio for recruiters, clients, and hiring managers.
- Keep the existing plain local implementation; do not add a frontend framework or external service.
- Required sections: home/hero, about, experience, featured projects, skills, education, contact, footer.
- Sticky desktop navigation and operable mobile menu; all controls work and have keyboard/assistive semantics.
- Respect reduced-motion preferences; no horizontal overflow; touch-friendly targets; fluid type and mobile-specific layout.
- Retain functional resume download, transcript view, GitHub/LinkedIn/Telegram/email and project live/repo links.

## Review Focus

- Long project and employer names on 320–375px screens remain within viewport without breaking the page.
- Mobile navigation can open, move focus normally, and closes after choosing an anchor or Escape.
- Reduced-motion mode disables nonessential reveals and smooth scrolling without hiding content.
- Project disclosures and image viewer work by keyboard as well as pointer; the viewer restores body scroll and focus on close.
- Direct-opening from `file://` keeps local assets and resume downloads resolving relative to `D:\Resume`.

---

### Task 1: Confirm product facts and visual design contract

**Files:**
- Create/update: `PRODUCT.md`, `.impeccable/surfaces/index.html.md`, `DESIGN.md` at finish only
- Create: planning notes in root and this plan document

- [x] Inspect all available source content, assets, user requirements, and installed design-skill references.
- [x] Confirm the portfolio product truth from the user before creating `PRODUCT.md`.
- [x] Agree the Impeccable build-path workflow and visual direction; the chooser was unreachable, so the user selected the direction explicitly in chat.
- [x] Record and read back the experience-led direction contract, including first viewport, visitor path, signature interaction, cross-section reach, risk, form position, and seed reference.

### Task 2: Add behavior tests before production changes

**Files:**
- Create: `tests/portfolio.test.mjs`
- Create/modify only as required: `package.json` (only if a package script adds material value; otherwise run Node test runner directly)

- [x] Add tests for required top-level sections, landmarks, and heading hierarchy.
- [x] Add tests for local links, secure external links, resume/contact/profile links, and no fake form.
- [x] Add tests for responsive/reduced-motion rules, the chapter rail, mobile navigation, and keyboard-operable project interactions.
- [x] Run `node --test tests/portfolio.test.mjs` before production edits and observe the expected RED: 7 passed, 12 failed on missing redesign requirements.

### Task 3: Implement the site shell and content

**Files:**
- Modify: `index.html`, `style.css`
- Create: `portfolio-data.js`, `app.js` if this remains clearer than embedded page logic
- Preserve: resume/transcript PDFs and existing project imagery

- [ ] Implement semantic document metadata, sticky nav, mobile nav, hero with existing portrait and truthful introduction.
- [ ] Implement About, Experience timeline, featured projects and remaining project disclosure, Skills, Education, Contact, Footer.
- [ ] Render concise, accurate project data from a separately maintainable source where useful; preserve repo/live links and relevant screenshots.
- [ ] Implement accessible mobile nav, active-section indication, reduced-motion-safe scroll reveals, project disclosures, and keyboard-accessible lightbox only if screenshots remain interactive.
- [ ] Keep document readable if JavaScript fails; avoid external runtime/CDN dependency where possible.

### Task 4: Refine the responsive design and accessibility

- [ ] Audit at 375px, 768px, laptop, and desktop widths; confirm no horizontal overflow.
- [ ] Test keyboard navigation, focus visibility, menu open/closed behavior, disclosure states, viewer Escape/arrow actions and focus restoration.
- [ ] Verify lightbox contrast, image alternatives, link semantics, heading sequence, reduced motion, image sizing/loading, and text contrast.
- [ ] Perform Impeccable mechanical detection once after implementation and fix relevant findings.

### Task 5: Verify and hand off

- [ ] Run all available static/Node checks and local serving checks.
- [ ] Test internal anchors, social links, PDFs, project links, responsive behavior, and browser console where a supported browser is available.
- [ ] Review final `git diff --check`, working-tree diff, local file references, and project launch instructions.
- [ ] Report only checks that were actually run; identify browser or engine limitations.
