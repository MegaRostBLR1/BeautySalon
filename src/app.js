import { renderBookingModal } from "./components/modal.js";
import { renderRoute } from "./app/router.js";

document.querySelector("#app").innerHTML = `
  <div id="app-header"></div><div id="app-content" tabindex="-1"></div><div id="app-footer"></div>
  ${renderBookingModal()}
`;

let bookingModalTrigger = null;
let previousBodyOverflow = "";
let bodyScrollLocked = false;

const syncBodyScrollLock = () => {
  const isMenuOpen = document.getElementById("nav-menu")?.classList.contains("is-open");
  const isModalOpen = document.getElementById("booking-modal")?.classList.contains("is-open");
  const shouldLock = isMenuOpen || isModalOpen;

  if (shouldLock && !bodyScrollLocked) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bodyScrollLocked = true;
  } else if (!shouldLock && bodyScrollLocked) {
    document.body.style.overflow = previousBodyOverflow;
    bodyScrollLocked = false;
  }
};

document.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (link?.classList.contains("beauty-header__link")) {
    const menu = document.getElementById("nav-menu");
    const burger = document.getElementById("burger-btn");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", String(window.matchMedia("(max-width: 768px)").matches));
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    syncBodyScrollLock();
  }

  if (link?.hash.startsWith("#/")) {
    event.preventDefault();
    if (location.hash === link.hash) renderRoute();
    else location.hash = link.hash;
    return;
  }

  if (link?.hash && !link.hash.startsWith("#/")) {
    const anchor = link.hash.slice(1);
    const isNestedRoute = location.hash.startsWith("#/") && !location.hash.startsWith("#/home");
    if (anchor && !document.getElementById(anchor) && isNestedRoute) {
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
    syncBodyScrollLock();
    menu.setAttribute("aria-hidden", String(!isOpen));
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  }
  const bookingTrigger = event.target.closest("#open-booking, [data-open-booking]");
  if (bookingTrigger) {
    const modal = document.getElementById("booking-modal");
    const serviceSelect = document.getElementById("service-select");
    const amountInput = document.getElementById("certificate-amount");
    const amountSummary = document.getElementById("certificate-amount-summary");
    const requestedService = bookingTrigger.dataset.bookingService;
    let certificateAmount = bookingTrigger.dataset.certificateAmount || "";

    if (bookingTrigger.dataset.certificateAmountInput) {
      const customAmountInput = document.getElementById(bookingTrigger.dataset.certificateAmountInput);
      if (!customAmountInput?.reportValidity()) return;
      certificateAmount = customAmountInput.value;
    }

    if (requestedService && serviceSelect) serviceSelect.value = requestedService;
    if (amountInput) amountInput.value = requestedService === "gift-certificate" ? certificateAmount : "";
    if (amountSummary) {
      amountSummary.hidden = requestedService !== "gift-certificate" || !certificateAmount;
      amountSummary.textContent = certificateAmount
        ? `Вы выбрали сертификат на ${Number(certificateAmount).toLocaleString("ru-RU")} Br`
        : "";
    }

    if (modal) {
      const modalTitle = modal.querySelector("#modal-title");
      if (modalTitle) {
        modalTitle.textContent = requestedService === "gift-certificate"
          ? "Заявка на подарочный сертификат"
          : "Онлайн-запись";
      }
      bookingModalTrigger = bookingTrigger;
      modal.classList.add("is-open");
      syncBodyScrollLock();
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector("#user-name")?.focus();
    }
  }
  if (event.target.closest("[data-close]")) closeBookingModal();
});

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal?.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  syncBodyScrollLock();
  modal.setAttribute("aria-hidden", "true");
  if (bookingModalTrigger?.isConnected) bookingModalTrigger.focus();
  bookingModalTrigger = null;
}

document.addEventListener("keydown", event => {
  const modal = document.getElementById("booking-modal");
  const isModalOpen = modal?.classList.contains("is-open");

  if (event.key === "Escape") {
    if (isModalOpen) {
      closeBookingModal();
      return;
    }

    const menu = document.getElementById("nav-menu");
    const burger = document.getElementById("burger-btn");
    if (menu?.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      syncBodyScrollLock();
      menu.setAttribute("aria-hidden", "true");
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      burger?.focus();
    }
    return;
  }

  if (event.key !== "Tab" || !isModalOpen || !modal) return;

  const focusable = [...modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => element.getClientRects().length > 0);
  if (!focusable.length) {
    event.preventDefault();
    modal.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
document.addEventListener("submit", event => {
  if (event.target.id !== "booking-form") return;
  event.preventDefault();
  const certificateAmount = event.target.querySelector("#certificate-amount")?.value;
  const confirmation = certificateAmount
    ? `Спасибо! Ваша заявка на подарочный сертификат на ${Number(certificateAmount).toLocaleString("ru-RU")} Br принята. Администратор свяжется с вами в ближайшее время.`
    : "Спасибо! Ваша заявка принята. Администратор свяжется с вами в ближайшее время.";
  alert(confirmation);
  event.target.reset();
  const amountSummary = document.getElementById("certificate-amount-summary");
  if (amountSummary) {
    amountSummary.hidden = true;
    amountSummary.textContent = "";
  }
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

const syncNavigationAccessibility = () => {
  const menu = document.getElementById("nav-menu");
  const burger = document.getElementById("burger-btn");
  if (!menu) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) {
    menu.classList.remove("is-open");
    syncBodyScrollLock();
    menu.setAttribute("aria-hidden", "false");
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    return;
  }

  menu.setAttribute("aria-hidden", String(!menu.classList.contains("is-open")));
};
window.addEventListener("app:route-rendered", syncNavigationAccessibility);
window.addEventListener("resize", syncNavigationAccessibility);

let newsSliderController;

const initNewsSlider = () => {
  newsSliderController?.abort();

  const slider = document.querySelector("[data-news-slider]");
  if (!slider) return;

  const track = slider.querySelector(".news__track");
  if (!track) return;

  const cards = [...track.querySelectorAll(".news-card")];
  const previousButton = document.querySelector("[data-news-prev]");
  const nextButton = document.querySelector("[data-news-next]");
  if (!cards.length || !previousButton || !nextButton) return;

  const controller = new AbortController();
  newsSliderController = controller;
  let currentIndex = 0;

  const updateSlider = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const visibleCount = Math.max(1, Math.floor((slider.clientWidth + gap) / (cardWidth + gap)));
    const maxIndex = Math.max(0, cards.length - visibleCount);

    currentIndex = Math.min(currentIndex, maxIndex);
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
  };

  previousButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  }, { signal: controller.signal });

  nextButton.addEventListener("click", () => {
    currentIndex += 1;
    updateSlider();
  }, { signal: controller.signal });

  window.addEventListener("resize", updateSlider, { signal: controller.signal });
  updateSlider();
};

window.addEventListener("app:route-rendered", initNewsSlider);

await renderRoute();
