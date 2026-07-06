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

  function initPromoPopup() {
    const promoCode = "STAYDIFFERENT";
    const promoUrl = "https://kayam-partner-portal.fly.dev/reservar?promo=STAYDIFFERENT";
    const dismissedKey = "casaKayamPromoSTAYDIFFERENTDismissed";
    const lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    const copyByLang = {
      en: {
        eyebrow: "Special offer",
        title: "10% off lodging",
        text: "Use code STAYDIFFERENT and book your stay at Casa Kayam.",
        codeLabel: "Promo code",
        note: "The code will be filled automatically.",
        cta: "Claim the offer",
        close: "Close offer"
      },
      es: {
        eyebrow: "Oferta especial",
        title: "10% en alojamiento",
        text: "Usa el codigo STAYDIFFERENT y reserva tu estadia en Casa Kayam.",
        codeLabel: "Codigo promo",
        note: "El codigo se rellenara automaticamente.",
        cta: "Aprovechar oferta",
        close: "Cerrar oferta"
      },
      fr: {
        eyebrow: "Offre speciale",
        title: "10% sur le logement",
        text: "Utilise le code STAYDIFFERENT et reserve ton sejour a Casa Kayam.",
        codeLabel: "Code promo",
        note: "Le code sera rempli automatiquement.",
        cta: "J'en profite",
        close: "Fermer l'offre"
      }
    };
    const copy = copyByLang[lang] || copyByLang.en;

    try {
      if (sessionStorage.getItem(dismissedKey) === "1") return;
    } catch (error) {
      // Storage can be unavailable in some privacy modes; the popup still works.
    }

    const popup = document.createElement("div");
    popup.className = "promo-popup";
    popup.setAttribute("aria-hidden", "true");
    popup.innerHTML = `
      <div class="promo-popup__backdrop" data-promo-popup-close></div>
      <section class="promo-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="promo-popup-title" aria-describedby="promo-popup-desc" tabindex="-1">
        <button class="promo-popup__close" type="button" aria-label="${copy.close}" data-promo-popup-close>+</button>
        <p class="promo-popup__eyebrow">${copy.eyebrow}</p>
        <h2 class="promo-popup__title" id="promo-popup-title">${copy.title}</h2>
        <p class="promo-popup__text" id="promo-popup-desc">${copy.text}</p>
        <div class="promo-popup__code" aria-label="${copy.codeLabel} ${promoCode}">
          <span>${copy.codeLabel}</span>
          <strong>${promoCode}</strong>
        </div>
        <a class="promo-popup__cta" href="${promoUrl}" target="_blank" rel="noreferrer" data-promo-popup-cta>${copy.cta}</a>
        <p class="promo-popup__note">${copy.note}</p>
      </section>
    `;

    function markDismissed() {
      try {
        sessionStorage.setItem(dismissedKey, "1");
      } catch (error) {
        // No-op when storage is blocked.
      }
    }

    function closePopup() {
      if (!popup.classList.contains("is-visible")) return;
      markDismissed();
      popup.classList.remove("is-visible");
      popup.setAttribute("aria-hidden", "true");
      document.removeEventListener("keydown", onPromoKeydown);
      window.setTimeout(() => popup.remove(), 220);
    }

    function onPromoKeydown(event) {
      if (event.key === "Escape") closePopup();
    }

    popup.querySelectorAll("[data-promo-popup-close]").forEach((closer) => {
      closer.addEventListener("click", closePopup);
    });

    const cta = popup.querySelector("[data-promo-popup-cta]");
    if (cta) cta.addEventListener("click", markDismissed);

    body.appendChild(popup);

    window.setTimeout(() => {
      popup.classList.add("is-visible");
      popup.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", onPromoKeydown);
      const dialog = popup.querySelector(".promo-popup__dialog");
      if (dialog) dialog.focus({ preventScroll: true });
    }, 900);
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

  initPromoPopup();
  syncScrollEffects();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
})();
