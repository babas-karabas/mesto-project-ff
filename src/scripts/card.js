export const makeCard = (cardItem, removeCard, likeCard, viewImage) => {
  const newCard = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  const deleteBtn = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const likeBtn = newCard.querySelector('.card__like-button');
  const cardTitle = newCard.querySelector('.card__title');

  cardImage.src = cardItem.link; 
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  
  deleteBtn.addEventListener('click', () => {
    removeCard(newCard);
  }); 

  likeBtn.addEventListener('click', () => {
    likeCard(likeBtn);
  }); 

  return newCard;
};

export const removeCard = (elem) => {
  elem.remove()
};

export const likeCard = (elem) => {
  elem.classList.toggle('card__like-button_is-active');
};

export const viewImage = (image) => {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  
  popupImage.src = image.src;
  popupCaption.textContent = image.alt;
}
