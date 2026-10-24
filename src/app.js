import { renderBookingModal } from "./components/modal.js";
import { renderRoute } from "./app/router.js";

document.querySelector("#app").innerHTML = `
  <div id="app-header"></div><main id="app-content" tabindex="-1"></main><div id="app-footer"></div>
  ${renderBookingModal()}
`;

document.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (link?.hash.startsWith("#/")) {
    event.preventDefault();
    if (location.hash === link.hash) renderRoute();
    else location.hash = link.hash;
    return;
  }

  if (link?.hash && !link.hash.startsWith("#/")) {
    const anchor = link.hash.slice(1);
    if (!document.getElementById(anchor) && location.hash.startsWith("#/services/")) {
      event.preventDefault();
      location.hash = `#/home#${anchor}`;
      return;
    }
  }

  const burger = event.target.closest("#burger-btn");
  if (burger) {
    const menu = document.getElementById("nav-menu");
    if (!menu) return;
    const isOpen = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  }
  if (event.target.closest(".beauty-header__link")) {
    document.getElementById("nav-menu")?.classList.remove("is-open");
    document.getElementById("burger-btn")?.setAttribute("aria-expanded", "false");
  }
  if (event.target.closest("#open-booking")) {
    const modal = document.getElementById("booking-modal");
    modal?.classList.add("is-open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  if (event.target.closest("[data-close]")) closeBookingModal();
});

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.addEventListener("keydown", event => { if (event.key === "Escape") closeBookingModal(); });
document.addEventListener("submit", event => {
  if (event.target.id !== "booking-form") return;
  event.preventDefault();
  alert("Спасибо! Ваша заявка принята. Администратор свяжется с вами в ближайшее время.");
  event.target.reset();
  closeBookingModal();
});
const initFaq = () => {
  const items = [...document.querySelectorAll(".faq__item")];
  items.forEach(item => {
    const summary = item.querySelector(".faq__question");
    if (!summary || summary.dataset.initialized) return;
    summary.dataset.initialized = "true";
    summary.addEventListener("click", event => {
      event.preventDefault();
      const shouldOpen = !item.open;
      items.forEach(other => { if (other !== item) other.open = false; });
      item.open = shouldOpen;
    });
  });
};
window.addEventListener("app:route-rendered", initFaq);
await renderRoute();
