# Verified findings

Source-of-truth review: the existing `index.html`, `project.txt`, local PDFs, and screenshots in this folder. Keep semantic content in `index.html` for direct `file://` use and non-JavaScript readability. Do not invent certifications, availability, client names, performance claims, or public demos.

## Person, contact, education

- Chorn Chhery; currently IT Programmer at MinebeaMitsumi Inc. in Phnom Penh, Cambodia (May 2026–present).
- Email: `chherychorn@gmail.com`.
- Profiles: GitHub `https://github.com/ChornChhery`; LinkedIn `https://www.linkedin.com/in/chhery-chorn/`; Telegram `https://t.me/chornchhery`.
- Prince of Songkla University, Pattani Campus, July 2022–April 2026; Bachelor of Mathematics and Computer Science, major in Data Science; cumulative GPA 3.68/4.0; First Class Honors; graduated April 2026.
- Transcript: `transcript.pdf`; full resume: `ChornChhery_Resume.pdf`; one-page resume: `ChornChhery_Resume_1page.pdf`.
- Leadership/activity: International English Exchange Program at Universiti Malaysia Kelantan, 8–14 September 2025.
- Communication languages from the original site: Khmer (Native), Thai (Advanced), English (Intermediate). No certifications are listed in the supplied material.

## Work history and verified highlights

- **MinebeaMitsumi Inc., IT Programmer, Phnom Penh (May 2026–present).** Built and runs a Telegram leave system (English/Khmer, group and Mini App) and a factory website for production lines, daily roster, worker borrowing, and leave dashboard. The systems exchange leave approvals/member information. Added retry handling, health checks, nightly backups with restore test, backup-first server updates with automatic rollback, Grafana monitoring, and a Raspberry Pi production counter. Wrote user guides, troubleshooting, runbooks, overview and handover documentation. Runs on Ubuntu/Docker.
- **Max Savings (Thailand) Co., LTD, AI Engineer (Co-op Intern, promoted to Staff), Bangkok (August 2025–April 2026).** Took over a .NET RAG chatbot and built its document-processing/search pipeline, hybrid vector + BM25 retrieval with Thai word splitting, Qdrant/SQLite storage, Redis cache, and Blazor WebAssembly/SignalR chat. The original site records response time changing from about 850 ms to under 100 ms with caching and question detection. Added admin evaluation/version controls, REST endpoints, xUnit tests, and user/API manuals. As co-op intern (August–October 2025), built .NET practice apps, an email screen, attendance QR check-in, and Figma designs.
- **Biomass Exchange Co., LTD, Full Stack Developer Intern, Bangkok (February–May 2025; 4 months).** Built a Go email notification system with 14 automated messages and 28 Thai/English templates, background workers, pending/sent/failed tracking, retries/reminders/cancellation, and booking-history CRUD using HTMX, JavaScript, and CSS.
- **Prince of Songkla University, Hat Yai Campus, Technical Assistant (13–15 December 2024).** Supported Python and robotics workshops at Programming Camp for 50+ students; helped with debugging and problem-solving.

## Skills as listed

- Languages: Python, TypeScript, C#, SQL, JavaScript, Go (basic).
- Backend/APIs: NestJS, Express, Flask, FastAPI, ASP.NET Core, SignalR, WebSocket, Socket.IO.
- Frontend: React, Next.js, Blazor WebAssembly, Tailwind CSS, HTMX.
- Data: PostgreSQL, SQL Server, SQLite, Redis, Qdrant, MongoDB, Prisma.
- AI/RAG: hybrid vector + BM25, Ollama/local models, embeddings, BLEU/GLEU/F1 evaluation, scikit-learn.
- DevOps/integrations: Docker Compose, Ubuntu, nginx, Caddy, Cloudflare Tunnel, Grafana, Prometheus, GitHub Actions, Telegram Bot API, Bakong KHQR.
- Testing: xUnit, Jest, Vitest. Also used: PHP, Java, C, C++, Dart/Flutter, MySQL, XGBoost, K-Means, Decision Tree, Raspberry Pi GPIO, Azure DevOps.

## Project inventory and real links

- **Leave Bot — Telegram Leave System** (2026; MinebeaMitsumi): English/Khmer Telegram group and Mini App; leave requests, review, dashboards/reports, retry queue and technical details documented in the source page. No public demo is listed.
- **Factory Website — Production Lines, Attendance and Leave Dashboard** (2026; MinebeaMitsumi): production line/roster/leave/worker borrowing features and synchronization with the leave bot. No public demo is listed.
- **Teeth — Two-Laptop Production Counter** (November 2026; MinebeaMitsumi): C#/.NET Framework 4.8 and PowerShell; IN key button, OUT barcode scanner, separate private network, offline queue, setup/self-repair, 113 simulator checks and testing on the actual laptops. Repository: `https://github.com/ChornChhery/Production-Plan`.
- **ChatBotRAG — Document Question Answering Chatbot** (February 2026): .NET 10, Blazor WebAssembly, ASP.NET Core, SignalR, hybrid vector/BM25 search, Qdrant and SQL Server, with English/Thai/Khmer support. Repository: `https://github.com/ChornChhery/RAG-`. Local screenshots: `ChatbotRag.png` through `ChatbotRag3.png`.
- **RAG App — Document Question Answering System** (October 2025): FastAPI, LlamaIndex, Ollama, Qdrant, Streamlit. Repository: `https://github.com/ChornChhery/Rag-AI-Agent`.
- **Jamoon Skincare Store — Online Shop + POS with Automatic KHQR Payments** (August 2025): English/Khmer storefront and POS, admin panel, Bakong KHQR payment flow, SQLite. Repository: `https://github.com/ChornChhery/Ecommerce-Skincare`; live demo: `https://jameskincare.vercel.app`. Screenshots: `skincare.png`, `skincare1.png`.
- **DataPilot AI — Autonomous Data Scientist Agent Platform** (March 2025): CSV upload and target selection, data cleaning, ML training/model selection, visual dashboard and PDF report; React/FastAPI/scikit-learn. Repository: `https://github.com/ChornChhery/DataPilot_AI`. Screenshots: `Datapilot1.png` through `Datapilot4.png`.
- **Server Monitoring Dashboards** (2026; MinebeaMitsumi): Grafana/Prometheus dashboards and read-only Python exporter, with privacy details in the original page. Repository: `https://github.com/ChornChhery/Monitoring-PC`.
- **Production-Line Counter on Raspberry Pi** (2026; MinebeaMitsumi): Python/Tkinter GPIO counter with shift plans and simulation mode.
- **ChatBotRagPy — RAG Chatbot with FastAPI + React** (March 2025): WebSocket streaming, local Ollama models, multilingual document routing and evaluation. Repository: `https://github.com/ChornChhery/ChatBot-with-React-Python`. Screenshots: `ChatbotRagPy.png` through `ChatbotRagPy3.png`.
- **IoT-Based Chicken Farm Monitoring System** (February 2024): sensor ingestion/validation, MongoDB, Shiny/Plotly dashboard and LINE notifications. Repository: `https://github.com/ChornChhery/Chicken-Farm-IOT`.
- **Jamoon Laundry Management System** (March 2024): PHP/JavaScript/MySQL, machine status, booking and admin analytics. Repository: `https://github.com/ChornChhery/Laundry-Management-System`; site: `https://jamoon.free.nf/`. Screenshots: `jamoon.png`, `jamoon1.png`.
- **Jame — Inventory & Sales Management App** (September 2025): Flutter/Dart mobile POS with barcode scanning, PDF receipts, inventory and analytics. Repository: `https://github.com/ChornChhery/Jame`.

## Local imagery and documents

- `me.png` (864×1083 PNG, 1.4 MB) is the portrait chosen for the hero; its subject is Chorn Chhery wearing glasses and a dark jacket.
- `jame.jpg` (960×1280 JPEG) is an alternate portrait at a historic temple; retained but not needed in the initial composition.
- Project screenshots are pre-existing files in this user folder. Source names and project associations are recorded above. Use descriptive alternatives for the visible interface, not generic “screenshot 1” text.
- Keep all three existing PDFs at their current root paths; do not modify them.

## Typeface provenance

- Chosen display face: **Barlow Condensed Bold**, self-hosted from the official Google Fonts repository: `https://github.com/google/fonts/blob/main/ofl/barlowcondensed/BarlowCondensed-Bold.ttf` (directory listing: `https://github.com/google/fonts/tree/main/ofl/barlowcondensed`).
- License: SIL Open Font License 1.1, official file: `https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt`. The font is bundled with the site together with `assets/fonts/OFL.txt`; no runtime web-font request is required.
- Local binary path: `assets/fonts/BarlowCondensed-Bold.ttf`. SHA-256 recorded from the download: `e476562ec9c1e16cf16475895b511f08c804f438cc9a9f80a44ea50a0eeb5b65`.
- The body uses a readable system humanist sans stack; monospaced text is reserved for dates and real record metadata.
