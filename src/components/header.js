export function renderHeader() {
  return `
<header class="beauty-header" id="header">
  <div class="beauty-header__container">
    <a href="#/" class="beauty-header__logo" aria-label="Ничего лишнего — главная"><span class="beauty-header__logo-text">НИЧЕГО ЛИШНЕГО</span></a>
    <nav class="beauty-header__nav" id="nav-menu" aria-label="Главная навигация">
      <ul class="beauty-header__menu">
        <li class="beauty-header__item"><a href="#services" class="beauty-header__link">Услуги</a></li>
        <li class="beauty-header__item"><a href="#subscriptions" class="beauty-header__link">Абонементы</a></li>
        <li class="beauty-header__item"><a href="#portfolio" class="beauty-header__link">Наши работы</a></li>
        <li class="beauty-header__item"><a href="#contacts" class="beauty-header__link">Контакты</a></li>
      </ul>
    </nav>
    <div class="beauty-header__actions">
      <a href="tel:+79609105333" class="beauty-header__phone">+7 (960) 910 5333</a>
      <button class="beauty-header__burger" id="burger-btn" aria-expanded="false" aria-controls="nav-menu" aria-label="Открыть меню"><span class="beauty-header__burger-line"></span><span class="beauty-header__burger-line"></span></button>
    </div>
  </div>
</header>`;
}