const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');
const card = cardTemplate.querySelector('.card');

function makeCard(cardItem, removeElement) {

  const newCard = card.cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  const cardImage = newCard.querySelector('.card__image');

  cardImage.src = cardItem.link; 
  cardImage.alt = cardItem.name;
  newCard.querySelector('.card__title').textContent = cardItem.name;
  
  deleteButton.addEventListener('click', function () {
    removeElement(newCard);
  }); 

  return newCard;
};

function removeElement(elem) {
  elem.remove();
};

const cards = initialCards.map(elem => {
  return makeCard(elem, removeElement);
});

cards.forEach(elem => {
  placesList.append(elem);
});







