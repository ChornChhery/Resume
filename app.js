(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const pad = (value) => String(value).padStart(2, "0");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ── Case viewer ───────────────────────────────────── */

  const CASES = [
    {
      title: "LEAVE BOT",
      key: "// leave bot",
      rows: [
        "MINEBEAMITSUMI / FACTORY SYSTEMS / 2026",
        "PYTHON · FLASK · POSTGRESQL",
        "INTERNAL SYSTEM",
      ],
      text: "— a Telegram leave system in English and Khmer, with a Mini App, retry queue and restore-tested backups.",
      note: "Internal system · no public demo",
      link: null,
      image: null,
      label: "CASE FILE · LEAVE BOT",
      record: {
        brand: "LEAVE BOT",
        sub: "TELEGRAM LEAVE SYSTEM / MINEBEAMITSUMI / 2026",
        grid: [
          ["EN + KH", "Group and Mini App"],
          ["RETRY QUEUE", "Survives database downtime"],
          ["BACKUPS", "Nightly restore test"],
          ["UPDATES", "Backup first, auto-rollback"],
        ],
      },
    },
    {
      title: "FACTORY WEBSITE",
      key: "// factory website",
      rows: [
        "MINEBEAMITSUMI / PRODUCTION LINES / 2026",
        "NESTJS · REACT · SOCKET.IO",
        "INTERNAL SYSTEM",
      ],
      text: "— a live plant website for production lines, Day/Night roster, worker borrowing and leave sync.",
      note: "Internal system · no public demo",
      link: null,
      image: null,
      label: "CASE FILE · FACTORY WEBSITE",
      record: {
        brand: "FACTORY SITE",
        sub: "LIVE LINES / ROSTER / LEAVE SYNC",
        grid: [
          ["SOCKET.IO", "Live line status"],
          ["ROSTER", "Day and Night shift"],
          ["BORROWING", "One transaction"],
          ["LEAVE SYNC", "Every minute"],
        ],
      },
    },
    {
      title: "TEETH",
      key: "// teeth",
      rows: [
        "MINEBEAMITSUMI / PRODUCTION COUNTER / 2026",
        "C# · .NET 4.8 · POWERSHELL",
        "REPOSITORY",
      ],
      text: "— a two-laptop shift counter with an IN key button, OUT barcode scanner and one-click self-repair.",
      note: "Public repository",
      link: "https://github.com/ChornChhery/Production-Plan",
      image: null,
      label: "CASE FILE · TEETH",
      record: {
        brand: "TEETH",
        sub: "TWO-LAPTOP SHIFT COUNTER / 2026",
        grid: [
          ["IN", "Key button"],
          ["OUT", "Barcode scanner"],
          ["SHIFTS", "Day and Night"],
          ["LOG", "Excel per shift"],
        ],
      },
    },
    {
      title: "CHATBOTRAG",
      key: "// chatbotrag",
      rows: [
        "PERSONAL / DOCUMENT QA / 2026",
        ".NET 10 · BLAZOR · QDRANT",
        "REPOSITORY",
      ],
      text: "— a full-stack RAG chatbot with hybrid search, source chunks and a saved evaluation tab.",
      note: "Public repository",
      link: "https://github.com/ChornChhery/RAG-",
      image: "assets/showcase/rag-chat.png",
      imageAlt: "ChatBotRAG chat interface showing a document-grounded answer and its source file.",
      label: "CASE FILE · CHATBOTRAG",
      record: null,
    },
    {
      title: "JAMOON SKINCARE",
      key: "// jamoon skincare",
      rows: [
        "PERSONAL / E-COMMERCE + POS / 2025",
        "NEXT.JS · EXPRESS · BAKONG KHQR",
        "REPOSITORY + LIVE DEMO",
      ],
      text: "— an English and Khmer storefront with counter POS, automatic KHQR payments and owner-only profit tracking.",
      note: "Live demo and repository",
      link: "https://github.com/ChornChhery/Ecommerce-Skincare",
      image: "assets/showcase/shop-home.png",
      imageAlt: "Jamoon Skincare storefront with product filters and a product grid.",
      label: "CASE FILE · JAMOON SKINCARE",
      record: null,
    },
    {
      title: "DATAPILOT AI",
      key: "// datapilot ai",
      rows: [
        "PERSONAL / AUTOML PLATFORM / 2025",
        "REACT · FASTAPI · SCIKIT-LEARN",
        "REPOSITORY",
      ],
      text: "— a zero-code AutoML platform that cleans a CSV, trains three models and returns a visual report.",
      note: "Public repository",
      link: "https://github.com/ChornChhery/DataPilot_AI",
      image: "assets/showcase/data-upload.png",
      imageAlt: "DataPilot AI upload screen for selecting a CSV and target column.",
      label: "CASE FILE · DATAPILOT AI",
      record: null,
    },
  ];

  const studio = $("#home");
  const stage = $("#studioStage");
  const caseUI = $("#caseUI");
  const laptopButton = $("#laptopButton");
  const exploreButton = $("#exploreButton");
  const caseBack = $("#caseBack");
  const casePrev = $("#casePrev");
  const caseNext = $("#caseNext");
  const caseTitle = $("#caseTitle");
  const caseRows = $("#caseRows");
  const caseKey = $("#caseKey");
  const caseText = $("#caseText");
  const caseLink = $("#caseLink");
  const caseNote = $("#caseNote");
  const caseCounter = $("#caseCounter");
  const screenImage = $("#caseScreenImage");
  const screenRecord = $("#caseRecord");
  const visualImage = $("#caseVisualImage");
  const visualRecord = $("#caseVisualRecord");
  const visualLabel = $("#caseVisualLabel");
  const caseResume = $(".case-resume");

  let caseIndex = 0;
  let caseOpen = false;
  let caseAnimating = false;

  const recordMarkup = (record) =>
    `<span class="record-brand">${record.brand}</span>` +
    `<span class="record-sub">${record.sub}</span>` +
    `<span class="record-grid">${record.grid
      .map(([label, value]) => `<span><b>${label}</b>${value}</span>`)
      .join("")}</span>`;

  function renderCase(index) {
    const item = CASES[index];
    if (!item) return;

    caseTitle.textContent = item.title;
    caseKey.textContent = item.key;
    caseText.textContent = item.text;
    caseNote.textContent = item.note;
    caseCounter.textContent = `${pad(index + 1)} / ${pad(CASES.length)}`;
    caseRows.innerHTML = item.rows.map((row) => `<span>${row}</span>`).join("");

    if (item.link) {
      caseLink.href = item.link;
      caseLink.hidden = false;
    } else {
      caseLink.hidden = true;
      caseLink.removeAttribute("href");
    }

    const record = item.record ? recordMarkup(item.record) : "";

    if (screenImage) {
      if (item.image) {
        screenImage.src = item.image;
        screenImage.alt = item.imageAlt || `${item.title} project screenshot`;
        screenImage.hidden = false;
      } else {
        screenImage.hidden = true;
      }
    }

    if (screenRecord) {
      screenRecord.innerHTML = record;
      screenRecord.hidden = !item.record;
    }

    if (visualImage) {
      if (item.image) {
        visualImage.src = item.image;
        visualImage.alt = item.imageAlt || `${item.title} project screenshot`;
        visualImage.hidden = false;
      } else {
        visualImage.hidden = true;
      }
    }

    if (visualRecord) {
      visualRecord.innerHTML = record;
      visualRecord.hidden = !item.record;
    }

    visualLabel.textContent = item.label;
    laptopButton.setAttribute("aria-label", `Open the ${item.title} case file`);
  }

  function openCase(index = caseIndex) {
    if (caseAnimating) return;
    if (typeof index === "number") {
      caseIndex = (index + CASES.length) % CASES.length;
      renderCase(caseIndex);
    }
    if (caseOpen) return;

    caseOpen = true;
    caseAnimating = true;
    stopSlides();
    studio.classList.add("is-diving");
    caseUI.setAttribute("aria-hidden", "false");
    caseUI.inert = false;

    const delay = reducedMotion.matches ? 0 : 780;
    window.setTimeout(() => {
      if (!caseOpen) return;
      studio.classList.add("case-open");
      studio.classList.remove("is-diving");
      document.body.classList.add("case-mode");
      if (stage) stage.inert = true;
      caseAnimating = false;
      caseBack.focus({ preventScroll: true });
    }, delay);
  }

  function closeCase() {
    if (!caseOpen) return;
    caseOpen = false;
    caseAnimating = false;
    studio.classList.remove("case-open", "is-diving");
    document.body.classList.remove("case-mode");
    caseUI.setAttribute("aria-hidden", "true");
    caseUI.inert = true;
    if (stage) stage.inert = false;
    laptopButton.focus({ preventScroll: true });
    startSlides();
  }

  function stepCase(direction) {
    caseIndex = (caseIndex + direction + CASES.length) % CASES.length;
    renderCase(caseIndex);
  }

  renderCase(caseIndex);
  if (caseUI) caseUI.inert = true;

  laptopButton?.addEventListener("click", () => openCase());
  exploreButton?.addEventListener("click", () => openCase(0));
  caseBack?.addEventListener("click", closeCase);
  casePrev?.addEventListener("click", () => stepCase(-1));
  caseNext?.addEventListener("click", () => stepCase(1));
  caseResume?.addEventListener("click", closeCase);

  $$(".site-header a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenu(false);
      if (caseOpen) closeCase();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!caseOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeCase();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepCase(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepCase(-1);
    }
  });

  /* ── Hero slides ───────────────────────────────────── */

  const slides = $$(".hero-slide");
  let slideIndex = 0;
  let slideTimer = null;

  function stopSlides() {
    if (slideTimer) {
      window.clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  function startSlides() {
    if (reducedMotion.matches || slides.length < 2 || caseOpen) return;
    stopSlides();
    slideTimer = window.setInterval(() => {
      slides[slideIndex].classList.remove("is-active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("is-active");
    }, 4200);
  }

  startSlides();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSlides();
    else startSlides();
  });

  reducedMotion.addEventListener?.("change", () => {
    stopSlides();
    startSlides();
  });

  /* ── Header + chapter rail ─────────────────────────── */

  const header = $("#siteHeader");
  const chapterLinks = $$(".chapter-rail a");
  const chapterSections = chapterLinks
    .map((link) => document.getElementById(link.dataset.chapterLink))
    .filter(Boolean);

  let scrollTicking = false;

  function updateScrollState() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);

    if (chapterSections.length) {
      const probe = window.innerHeight * 0.35;
      let current = chapterSections[0];
      for (const section of chapterSections) {
        if (section.getBoundingClientRect().top <= probe) current = section;
      }
      for (const link of chapterLinks) {
        const active = link.dataset.chapterLink === current.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    }
    scrollTicking = false;
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollState();

  /* ── Mobile navigation ─────────────────────────────── */

  const menuToggle = $("#menuToggle");
  const primaryNav = $("#primaryNav");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuToggle?.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("menu-open"));
  });

  $$(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && document.body.classList.contains("menu-open")) {
      setMenu(false);
    }
  });

  /* ── Lightbox ──────────────────────────────────────── */

  const dialog = $("#lightbox");
  const lightboxImage = $("#lbImage");
  const lightboxCounter = $("#lbCounter");
  const lightboxCaption = $("#lbCaption");
  const lightboxClose = $("#lbClose");
  const lightboxPrev = $("#lbPrev");
  const lightboxNext = $("#lbNext");
  const galleries = new Map();

  $$(".shot").forEach((button) => {
    const name = button.dataset.gallery || "default";
    if (!galleries.has(name)) galleries.set(name, []);
    galleries.get(name).push({
      src: button.dataset.src,
      alt: button.dataset.alt || "",
      caption: button.dataset.caption || button.dataset.alt || "",
    });
  });

  let gallery = [];
  let galleryIndex = 0;

  function renderLightbox() {
    const item = gallery[galleryIndex];
    if (!item) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCounter.textContent = `${pad(galleryIndex + 1)} / ${pad(gallery.length)}`;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
  }

  function openLightbox(button) {
    gallery = galleries.get(button.dataset.gallery || "default") || [];
    galleryIndex = gallery.findIndex((item) => item.src === button.dataset.src);
    if (galleryIndex < 0) galleryIndex = 0;
    renderLightbox();
    if (typeof dialog.showModal === "function" && !dialog.open) {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (dialog.open && typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("lightbox-open");
  }

  function stepLightbox(direction) {
    if (!gallery.length) return;
    galleryIndex = (galleryIndex + direction + gallery.length) % gallery.length;
    renderLightbox();
  }

  $$(".shot").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
  lightboxNext?.addEventListener("click", () => stepLightbox(1));

  dialog?.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });

  dialog?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }
  });
})();
