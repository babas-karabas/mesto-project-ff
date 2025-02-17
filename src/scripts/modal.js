const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); 
    closeModal(openedPopup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
  const popupForm = modal.querySelector('.popup__form');
    if (popupForm) {
      popupForm.reset();
    }
};

export const attachEventListener = (modal) => {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', (evt) => {
    closeModal(modal);
  });

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
}


