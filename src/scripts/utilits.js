export const renderError = (errorElement, err) => {
  errorElement.textContent = err;
};

export const renderSpinner = (spinnerElement, isLoading) => {
  if (isLoading) {
    spinnerElement.classList.add('spinner_is-visible');
  } else {
    spinnerElement.classList.remove('spinner_is-visible');
  }
}

export const renderSaving = (form, isLoading) => {
  const btnSaveElement = form.querySelector('.popup__button');
  if (isLoading) {
    btnSaveElement.textContent = 'Сохранение...';
  } else {
    btnSaveElement.textContent = btnSaveElement.getAttribute('data-bydefault-text');
  }
}
