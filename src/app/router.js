import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

const routes = {
  home: { path: "pages/home.html", title: "Салон красоты «Ничего лишнего»" },
  hardwareMassages: { path: "pages/hardware-massages.html", title: "Аппаратные массажи и цены — Ничего лишнего" }
};

function resolveRoute() {
  return location.hash.startsWith("#/services/hardware-massages") ? routes.hardwareMassages : routes.home;
}

export async function renderRoute() {
  const route = resolveRoute();
  const outlet = document.querySelector("#app-content");
  if (!outlet) return;
  try {
    const response = await fetch(route.path);
    if (!response.ok) throw new Error(`Не удалось загрузить страницу: ${response.status}`);
    outlet.innerHTML = await response.text();
    document.title = route.title;
    document.querySelector("#app-header").innerHTML = renderHeader();
    document.querySelector("#app-footer").innerHTML = renderFooter();
    window.dispatchEvent(new CustomEvent("app:route-rendered"));
    if (location.hash.startsWith("#/") && location.hash.includes("#")) {
      const anchor = location.hash.split("#").at(-1);
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
    } else if (!location.hash.startsWith("#/")) {
      window.scrollTo(0, 0);
    }
  } catch (error) {
    outlet.innerHTML = '<section class="page-error"><h1>Не удалось загрузить страницу</h1><p>Обновите страницу или вернитесь на главную.</p><a href="#/">На главную</a></section>';
    console.error(error);
  }
}
window.addEventListener("hashchange", renderRoute);
