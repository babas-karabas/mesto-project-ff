
export const makeCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup, myId) => {
  const newCard = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  const deleteBtn = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const likeCounter = newCard.querySelector('.card__like-counter');
  const likeBtn = newCard.querySelector('.card__like-button');

  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  changeLikeCount(likeCounter, cardData);
  
  if (cardData.owner._id === myId) {
    deleteBtn.addEventListener('click', () => onDeleteCard(cardData, newCard));
  } else {
    removeElement(deleteBtn);
  }

  if (cardData.likes.some(like => like._id === myId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  likeBtn.addEventListener('click', (evt) => {
    togglelikeBtn(likeBtn);
    const isLiked = likeBtn.classList.contains('card__like-button_is-active');

    onLikeCard(cardData, isLiked)
    .then(data => {
      changeLikeCount(likeCounter, data);
    })
    .catch(() => togglelikeBtn(likeBtn))
    });

  cardImage.addEventListener('click', () => onOpenImagePopup(cardData));

  return newCard;
};

// функция удаления элемента
export const removeElement = (elem) => elem.remove();

// функция изменения оформления кнопки лайка
const togglelikeBtn = (likeBtn) => {
  likeBtn.classList.toggle('card__like-button_is-active');
};

// функция изменения счетчика лайков
const changeLikeCount = (counterElement, cardData) => {
  counterElement.textContent = cardData.likes.length;

}
// функция отправки лайка/дизлайка на сервер
export const handleLikeClick = (onLikeApi, onDislikeApi) => (cardData, isLiked) => { 

  if (isLiked) {
    return onLikeApi(cardData._id)
  } else {
    return onDislikeApi(cardData._id)
  }
}

// функция удаления карточки c сервера
export const removeCard = (onDeleteApi, onRenderError, contentLoadingError) => (cardData, cardElement) => {
  onDeleteApi(`cards/${cardData._id}`)
  .then(() => {
    removeElement(cardElement);
  })
  .catch(err => {
    onRenderError(contentLoadingError, `Ошибка: ${err}`);
  })
}






