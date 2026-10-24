export function renderBookingModal() {
  return `
<div class="modal" id="booking-modal" aria-hidden="true" role="dialog" aria-labelledby="modal-title">
  <div class="modal__overlay" data-close></div><div class="modal__content">
    <button class="modal__close" data-close aria-label="Закрыть модальное окно">&times;</button><h2 class="modal__title" id="modal-title">Онлайн-запись</h2>
    <form class="booking-form" id="booking-form">
      <div class="booking-form__group"><label for="user-name" class="booking-form__label">Ваше имя</label><input type="text" id="user-name" class="booking-form__input" required placeholder="Елена"></div>
      <div class="booking-form__group"><label for="user-phone" class="booking-form__label">Телефон</label><input type="tel" id="user-phone" class="booking-form__input" required placeholder="+7 (___) ___-__-__"></div>
      <div class="booking-form__group"><label for="service-select" class="booking-form__label">Услуга</label><select id="service-select" class="booking-form__select" required><option value="">Выберите услугу</option><option value="device-massage">Аппаратные массажи</option><option value="manual-massage">Ручные массажи</option><option value="weight-loss">Программы похудения</option><option value="hair">Парикмахерские услуги</option><option value="cosmetology">Косметология</option></select></div>
      <button type="submit" class="button button--primary button--full">Записаться</button>
    </form>
  </div>
</div>`;
}