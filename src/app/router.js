import { renderHeader } from "../components/header.js";
import { renderContactsSection, renderFooter } from "../components/footer.js";
import { newsArticles } from "../data/news.js";

const routes = {
  home: { path: "src/pages/home.html", title: "Салон красоты «Ничего лишнего»" },
  hardwareMassages: { path: "src/pages/hardware-massages.html", title: "Аппаратные массажи и цены — Ничего лишнего" },
  hardwareMassageSubscriptions: { path: "src/pages/hardware-massage-subscriptions.html", title: "Абонементы на аппаратные массажи — Ничего лишнего" },
  manualMassageSubscriptions: { path: "src/pages/manual-massage-subscriptions.html", title: "Абонементы на ручные массажи — Ничего лишнего" },
  manualMassages: { path: "src/pages/manual-massages.html", title: "Ручные массажи — Ничего лишнего" },
  weightLoss: { path: "src/pages/weight-loss.html", title: "Программы похудения — Ничего лишнего" },
  hairServices: { path: "src/pages/hair-services.html", title: "Парикмахерские услуги и цены — Ничего лишнего" },
  hairServiceSubscriptions: { path: "src/pages/hair-service-subscriptions.html", title: "Абонементы на парикмахерские услуги — Ничего лишнего" },
  giftCertificates: { path: "src/pages/gift-certificates.html", title: "Подарочные сертификаты — Ничего лишнего" },
  newsArticle: { path: "src/pages/news-article.html", title: "Статья — Новости салона «Ничего лишнего»" }
};

function resolveRoute() {
  const newsMatch = location.hash.match(/^#\/news\/([^/?#]+)/);
  if (newsMatch) return { ...routes.newsArticle, articleSlug: newsMatch[1] };
  if (location.hash.startsWith("#/gift-certificates")) return routes.giftCertificates;
  if (location.hash.startsWith("#/services/hardware-massages")) return routes.hardwareMassages;
  if (location.hash.startsWith("#/subscriptions/hardware-massages")) return routes.hardwareMassageSubscriptions;
  if (location.hash.startsWith("#/subscriptions/manual-massages")) return routes.manualMassageSubscriptions;
  if (location.hash.startsWith("#/services/manual-massages")) return routes.manualMassages;
  if (location.hash.startsWith("#/services/weight-loss")) return routes.weightLoss;
  if (location.hash.startsWith("#/subscriptions/hair-services")) return routes.hairServiceSubscriptions;
  if (location.hash.startsWith("#/services/hair-services")) return routes.hairServices;
  return routes.home;
}

export async function renderRoute() {
  const route = resolveRoute();
  const article = route.articleSlug ? newsArticles.find(item => item.slug === route.articleSlug) : null;
  const outlet = document.querySelector("#app-content");
  if (!outlet) return;
  try {
    if (route.articleSlug && !article) {
      outlet.innerHTML = '<main class="news-article__not-found"><h1>Статья не найдена</h1><a href="#/home#news">Вернуться к новостям</a></main>';
      document.title = "Статья не найдена — Ничего лишнего";
      document.querySelector("#app-header").innerHTML = renderHeader();
      document.querySelector("#app-footer").innerHTML = renderFooter();
      window.dispatchEvent(new CustomEvent("app:route-rendered"));
      window.scrollTo(0, 0);
      return;
    }
    const response = await fetch(route.path);
    if (!response.ok) throw new Error(`Не удалось загрузить страницу: ${response.status}`);
    outlet.innerHTML = await response.text();
    if (article) {
      const image = outlet.querySelector("[data-article-image]");
      const title = outlet.querySelector("[data-article-title]");
      const date = outlet.querySelector("[data-article-date]");
      const body = outlet.querySelector("[data-article-body]");
      if (!image || !title || !date || !body) throw new Error("Шаблон статьи имеет неверную структуру");
      image.src = article.image;
      image.alt = article.imageAlt;
      title.textContent = article.title;
      date.dateTime = article.dateTime;
      date.textContent = article.date;
      article.paragraphs.forEach(text => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        body.append(paragraph);
      });
    }
    document.title = article ? `${article.title} — Новости салона «Ничего лишнего»` : route.title;
    document.querySelector("#app-header").innerHTML = renderHeader();
    const footerOutlet = document.querySelector("#app-footer");
    if (route.path === routes.home.path) {
      const faq = outlet.querySelector("#faq");
      const contactsWrapper = document.createElement("div");
      contactsWrapper.innerHTML = renderContactsSection();
      const contacts = contactsWrapper.firstElementChild;
      if (!faq || !contacts) throw new Error("Не удалось разместить контакты перед FAQ");
      faq.before(contacts);
    }
    footerOutlet.innerHTML = renderFooter();
    window.dispatchEvent(new CustomEvent("app:route-rendered"));
    if (location.hash.startsWith("#/")) {
      const anchorSeparator = location.hash.indexOf("#", 2);
      if (anchorSeparator !== -1) {
        const anchor = location.hash.slice(anchorSeparator + 1);
        requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  } catch (error) {
    outlet.innerHTML = '<section class="page-error"><h1>Не удалось загрузить страницу</h1><p>Обновите страницу или вернитесь на главную.</p><a href="#/">На главную</a></section>';
    console.error(error);
  }
}
window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#/")) renderRoute();
});
