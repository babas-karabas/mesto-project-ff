export const makeCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup) => {
  const newCard = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  const deleteBtn = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const likeBtn = newCard.querySelector('.card__like-button');
  const cardTitle = newCard.querySelector('.card__title');

  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteBtn.addEventListener('click', () => {
    onDeleteCard(newCard);
  }); 

  likeBtn.addEventListener('click', () => {
    onLikeCard(likeBtn);
  }); 

  cardImage.addEventListener('click', () => {
    onOpenImagePopup(cardData);
  });

  return newCard;
};

export const removeCard = (elem) => {
  elem.remove()
};

export const likeCard = (elem) => {
  elem.classList.toggle('card__like-button_is-active');
};


