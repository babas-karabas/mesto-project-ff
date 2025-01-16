const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

function makeCard(cardLink, cardTitle) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');

  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = cardTitle;
  newCard.querySelector('.card__title').textContent = cardTitle;
  
  deleteButton.addEventListener('click', function () {
    removeCard(deleteButton);
  }); 
  
  placesList.append(newCard);
};

function removeCard(button) {
  const removingItem = button.parentElement;
  removingItem.remove();
};

initialCards.forEach(card => {
  makeCard(card.link, card.name);
});








