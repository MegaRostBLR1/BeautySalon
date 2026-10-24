import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

const routes = {
  home: { path: "src/pages/home.html", title: "Салон красоты «Ничего лишнего»" },
  hardwareMassages: { path: "src/pages/hardware-massages.html", title: "Аппаратные массажи и цены — Ничего лишнего" },
  manualMassages: { path: "src/pages/manual-massages.html", title: "Ручные массажи — Ничего лишнего" },
  weightLoss: { path: "src/pages/weight-loss.html", title: "Программы похудения — Ничего лишнего" },
  hairServices: { path: "src/pages/hair-services.html", title: "Парикмахерские услуги и цены — Ничего лишнего" }
};

function resolveRoute() {
  if (location.hash.startsWith("#/services/hardware-massages")) return routes.hardwareMassages;
  if (location.hash.startsWith("#/services/manual-massages")) return routes.manualMassages;
  if (location.hash.startsWith("#/services/weight-loss")) return routes.weightLoss;
  if (location.hash.startsWith("#/services/hair-services")) return routes.hairServices;
  return routes.home;
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
