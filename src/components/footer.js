export function renderFooter() {
  return `
<section class="beauty-footer" id="contacts" aria-label="Контакты салона">
  <div class="beauty-footer__container">
    <div class="beauty-footer__intro">
      <span class="beauty-footer__eyebrow">Пространство заботы о себе</span>
      <h2 class="beauty-footer__brand">НИЧЕГО ЛИШНЕГО</h2>
      <p class="beauty-footer__description">Красота в деталях, внимание к себе и время, которое можно посвятить только себе.</p>
      <div class="beauty-footer__socials">
        <span class="beauty-footer__social-label">Мы на связи</span>
        <span class="beauty-footer__social-name">Instagram</span>
        <span class="beauty-footer__social-name">Telegram</span>
      </div>
    </div>

    <div class="beauty-footer__locations">
      <h3 class="beauty-footer__heading">Наши филиалы</h3>
      <div class="beauty-footer__location-grid">
        <article class="beauty-footer__location">
          <span class="beauty-footer__location-number">01</span>
          <h4 class="beauty-footer__location-title">Маяковского</h4>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%8F%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%20140" class="beauty-footer__address" target="_blank" rel="noopener noreferrer">Минск, ул. Маяковского, 140</a>
          <a href="tel:+375296909092" class="beauty-footer__phone">+375 29 690-90-92</a>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%8F%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%20140" class="beauty-footer__map" target="_blank" rel="noopener noreferrer">Показать на карте <span aria-hidden="true">↗</span></a>
        </article>

        <article class="beauty-footer__location">
          <span class="beauty-footer__location-number">02</span>
          <h4 class="beauty-footer__location-title">Корженевского</h4>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D0%BF%D0%B5%D1%80.%20%D0%9A%D0%BE%D1%80%D0%B6%D0%B5%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%206%D0%91" class="beauty-footer__address" target="_blank" rel="noopener noreferrer">Минск, пер. Корженевского, 6Б</a>
          <a href="tel:+375293736400" class="beauty-footer__phone">+375 29 373-64-00</a>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D0%BF%D0%B5%D1%80.%20%D0%9A%D0%BE%D1%80%D0%B6%D0%B5%D0%BD%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%206%D0%91" class="beauty-footer__map" target="_blank" rel="noopener noreferrer">Показать на карте <span aria-hidden="true">↗</span></a>
        </article>

        <article class="beauty-footer__location">
          <span class="beauty-footer__location-number">03</span>
          <h4 class="beauty-footer__location-title">Кальварийская</h4>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%BB%D1%8C%D0%B2%D0%B0%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%201" class="beauty-footer__address" target="_blank" rel="noopener noreferrer">Минск, ул. Кальварийская, 1</a>
          <a href="tel:+375293736400" class="beauty-footer__phone">+375 29 373-64-00</a>
          <a href="https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%BB%D1%8C%D0%B2%D0%B0%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%201" class="beauty-footer__map" target="_blank" rel="noopener noreferrer">Показать на карте <span aria-hidden="true">↗</span></a>
        </article>
      </div>
    </div>
  </div>

  <div class="beauty-footer__bottom">
    <div class="beauty-footer__bottom-container">
      <p class="beauty-footer__copyright">&copy; 2026 «Ничего лишнего». Все права защищены.</p>
      <a class="beauty-footer__back-to-top" href="#/">На главную <span aria-hidden="true">↑</span></a>
    </div>
  </div>
</section>`;
}