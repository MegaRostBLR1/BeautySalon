import { renderBookingModal } from "./components/modal.js";
import { renderRoute } from "./app/router.js";

document.querySelector("#app").innerHTML = `
  <div id="app-header"></div><div id="app-content" tabindex="-1"></div><div id="app-footer"></div>
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
  const faqItems = document.querySelectorAll(".faq__item");
  const faqAnimations = new WeakMap();

  const closeFaqItem = item => {
    const answer = item.querySelector(".faq__answer");
    if (!item.open || !answer) return Promise.resolve();

    faqAnimations.get(item)?.cancel();
    const currentHeight = answer.getBoundingClientRect().height;
    const animation = answer.animate(
      [{ height: `${currentHeight}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
      { duration: 240, easing: "ease", fill: "forwards" }
    );
    faqAnimations.set(item, animation);

    return new Promise(resolve => {
      animation.onfinish = () => {
        if (faqAnimations.get(item) !== animation) return resolve();
        item.open = false;
        answer.style.height = "";
        answer.style.opacity = "";
        animation.cancel();
        faqAnimations.delete(item);
        resolve();
      };
      animation.oncancel = resolve;
    });
  };

  const openFaqItem = item => {
    const answer = item.querySelector(".faq__answer");
    if (!answer) return;

    faqAnimations.get(item)?.cancel();
    item.open = true;
    answer.style.height = "0px";
    answer.style.opacity = "0";

    requestAnimationFrame(() => {
      const targetHeight = answer.scrollHeight;
      const animation = answer.animate(
        [{ height: "0px", opacity: 0 }, { height: `${targetHeight}px`, opacity: 1 }],
        { duration: 260, easing: "ease", fill: "forwards" }
      );
      faqAnimations.set(item, animation);
      animation.onfinish = () => {
        if (faqAnimations.get(item) !== animation) return;
        answer.style.height = "";
        answer.style.opacity = "";
        animation.cancel();
        faqAnimations.delete(item);
      };
    });
  };

  faqItems.forEach(item => {
    const question = item.querySelector(".faq__question");
    if (!question || question.dataset.initialized) return;
    question.dataset.initialized = "true";
    question.addEventListener("click", event => {
      event.preventDefault();
      if (item.open) {
        closeFaqItem(item);
        return;
      }
      const closingItems = [...faqItems]
        .filter(other => other !== item && other.open)
        .map(closeFaqItem);
      Promise.all(closingItems).then(() => {
        if (![...faqItems].some(other => other !== item && other.open)) openFaqItem(item);
      });
    });
  });
};
window.addEventListener("app:route-rendered", initFaq);
await renderRoute();
