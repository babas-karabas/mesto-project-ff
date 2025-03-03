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
};

export const attachEventListener = (modal) => {
  const closeBtn = modal.querySelector('.popup__close');
  
  closeBtn.addEventListener('click', (evt) => closeModal(modal));

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
}


