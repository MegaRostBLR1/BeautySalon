const formatAmount = amount => new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0
}).format(amount);

export function initGiftCertificatePurchase() {
  const page = document.querySelector("[data-gift-purchase]");
  if (!page || page.dataset.initialized === "true") return;

  page.dataset.initialized = "true";

  const options = [...page.querySelectorAll("[data-certificate-option]")];
  const customInput = page.querySelector("[data-certificate-custom]");
  const preview = page.querySelector("[data-certificate-preview]");
  const total = page.querySelector("[data-certificate-total]");

  if (!options.length || !customInput || !preview || !total) return;

  const updateAmount = value => {
    const amount = Number(value);
    const isValid = Number.isSafeInteger(amount) && amount > 0;

    options.forEach(option => {
      const isSelected = isValid
        && Number(option.dataset.certificateOption) === amount
        && customInput.value === "";
      option.setAttribute("aria-pressed", String(isSelected));
    });

    const formattedAmount = isValid ? formatAmount(amount) + " BYN" : "";
    preview.textContent = isValid ? formattedAmount : "ВЫБЕРИТЕ СУММУ";
    total.textContent = isValid ? formattedAmount : "Не выбрана";
  };

  options.forEach(option => {
    option.addEventListener("click", () => {
      customInput.value = "";
      updateAmount(option.dataset.certificateOption);
    });
  });

  customInput.addEventListener("input", () => {
    options.forEach(option => option.setAttribute("aria-pressed", "false"));
    updateAmount(customInput.value);
  });

  customInput.addEventListener("change", () => {
    if (customInput.value !== "" && !customInput.checkValidity()) {
      customInput.reportValidity();
    }
  });

  updateAmount("");
}
