// Main JavaScript
(function () {
  const header = document.getElementById("hd");
  const scenicBand = document.getElementById("s89Band");
  const scenicParallax = document.getElementById("s89Parallax");
  const openers = document.querySelectorAll("[data-modal-open]");
  const body = document.body;
  const VIDEO_URL = "https://www.youtube-nocookie.com/embed/HGFQbklmo6U?autoplay=1&rel=0&playsinline=1";

  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  function initPromoFloat() {
    const promoUrl = "https://kayam-partner-portal.fly.dev/reservar?promo=STAYDIFFERENT";
    const lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    const labelByLang = {
      en: "Book with 10% off",
      es: "Reservar con 10% de descuento",
      fr: "Reserver avec 10% de reduction"
    };
    const promoFloat = document.createElement("a");
    promoFloat.className = "promo-float";
    promoFloat.href = promoUrl;
    promoFloat.setAttribute("aria-label", labelByLang[lang] || labelByLang.en);
    promoFloat.innerHTML = `
      <span class="promo-float__badge">10%</span>
      <span class="promo-float__text">OFF</span>
    `;

    body.appendChild(promoFloat);
  }

  function syncHeaderState() {
    if (!header) return;
    const currentScrollY = window.scrollY;

    header.classList.toggle("scrolled", currentScrollY > 16);

    // Cacher au scroll vers le bas, réafficher au scroll vers le haut.
    // On reste toujours visible près du haut de la page.
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      header.classList.add("hd--hidden");
    } else if (currentScrollY < lastScrollY) {
      header.classList.remove("hd--hidden");
    }

    lastScrollY = currentScrollY;
  }

  function syncScenicParallax() {
    if (!scenicBand || !scenicParallax) return;

    const rect = scenicBand.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.min(1, Math.max(0, rawProgress));
    const travel = Math.min(180, viewportHeight * 0.24);
    const shift = travel * (0.5 - progress);

    scenicParallax.style.setProperty("--s89-shift", `${shift.toFixed(2)}px`);
  }

  function syncScrollEffects() {
    syncHeaderState();
    syncScenicParallax();
    scrollTicking = false;
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(syncScrollEffects);
  }

  // Verrouillage du défilement : la fenêtre étant le conteneur de scroll,
  // on fige le body à sa position courante pour empêcher l'arrière-plan
  // de défiler derrière la modale (et donc d'avoir à scroller pour la voir).
  let lockedScrollY = 0;

  function lockScroll() {
    lockedScrollY = window.scrollY;
    body.classList.add("modal-open");
    body.style.top = `-${lockedScrollY}px`;
  }

  function unlockScroll() {
    body.classList.remove("modal-open");
    body.style.top = "";
    // Restauration INSTANTANÉE de la position : sans ça, le scroll-behavior
    // smooth (CSS) animerait ce retour et créerait un saut désagréable.
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, lockedScrollY);
    root.style.scrollBehavior = prevBehavior;
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();
    // Stop video on close (use removeAttribute, not src="")
    const iframe = modal.querySelector("iframe");
    if (iframe) iframe.removeAttribute("src");
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll();
    // Start video on open
    const iframe = modal.querySelector("iframe");
    if (iframe) iframe.setAttribute("src", VIDEO_URL);
  }

  openers.forEach((opener) => {
    opener.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = opener.getAttribute("data-modal-open");
      openModal(document.getElementById(modalId));
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((closer) => {
    closer.addEventListener("click", () => {
      closeModal(closer.closest(".modal"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openModalElement = document.querySelector(".modal.is-open");
    closeModal(openModalElement);
  });

  document.querySelectorAll(".faq__row").forEach((row) => {
    const button = row.querySelector(".faq__btn");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = row.classList.contains("is-open");
      row.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  const faqMoreBtn = document.querySelector("[data-faq-more]");
  if (faqMoreBtn) {
    const faqExtra = faqMoreBtn.nextElementSibling;
    faqMoreBtn.addEventListener("click", () => {
      const isOpen = faqExtra.classList.toggle("is-visible");
      faqMoreBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // ── Menu mobile (burger) ───────────────────────────────────────────
  const burger = document.getElementById("hdBurger");
  const mobileNav = document.getElementById("hdMobile");

  function setMobileNav(open) {
    if (!header || !burger) return;
    header.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    if (mobileNav) mobileNav.setAttribute("aria-hidden", String(!open));
  }

  if (burger) {
    burger.addEventListener("click", () => {
      setMobileNav(!header.classList.contains("nav-open"));
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMobileNav(false));
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileNav(false);
  });

  document.addEventListener("click", (event) => {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) setMobileNav(false);
  });

  initPromoFloat();
  syncScrollEffects();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
})();
