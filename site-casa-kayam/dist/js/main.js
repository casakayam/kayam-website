// Main JavaScript
(function () {
  const openers = document.querySelectorAll("[data-modal-open]");
  const body = document.body;

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
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
})();
