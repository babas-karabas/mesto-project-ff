export const makeCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup, myId) => {
  const newCard = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  const deleteBtn = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const likeBtn = newCard.querySelector('.card__like-button');
  const cardTitle = newCard.querySelector('.card__title');
  const likeCounter = newCard.querySelector('.card__like-counter');

  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if (cardData.owner._id === myId) {
    deleteBtn.addEventListener('click', () => onDeleteCard(cardData, newCard));
  } else {
    removeElement(deleteBtn);
  }

  likeBtn.addEventListener('click', () => onLikeCard(likeBtn)); 

  cardImage.addEventListener('click', () => onOpenImagePopup(cardData));

  return newCard;
};

export const removeElement = (elem) => elem.remove();

export const likeCard = (elem) => elem.classList.toggle('card__like-button_is-active');


