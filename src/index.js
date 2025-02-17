// импорты
import './pages/index.css';

import { initialCards } from './scripts/cards';
import { makeCard, removeCard, likeCard, viewImage } from './scripts/card';
import { openModal, closeModal, attachEventListener } from './scripts/modal';


// переменные 
const placesList = document.querySelector('.places__list');
const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
 

// кнопки
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');

// попапы
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// формы и инпуты
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const userNameInput = profileForm.elements.name;
const userAboutInput = profileForm.elements.description;
const cardUrlInput = cardForm.elements.link;
const cardPlaceNameInput = cardForm.elements['place-name'];

// объявление функций

// функция редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userAbout.textContent = userAboutInput.value;
  closeModal(profilePopup);
};

// функция добавления карточки через форму
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  placesList.prepend(makeCard({name: cardPlaceNameInput.value, link: cardUrlInput.value}, removeCard, likeCard, viewImage));
  closeModal(newCardPopup);
};

// добавляем карточки на страницу из массива при обновлении страницы
initialCards.forEach(elem => {
  placesList.append(makeCard(elem, removeCard, likeCard, viewImage))
});

// навешиваем слушатели для открытия попапов

profileEditBtn.addEventListener('click', (evt) => {
  openModal(profilePopup);
  userNameInput.placeholder = userName.textContent;
  userAboutInput.placeholder = userAbout.textContent;
  });

profileAddBtn.addEventListener('click', (evt) => {
  openModal(newCardPopup);
  });

placesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    openModal(imagePopup);
    viewImage(evt.target)
  }
});

//навешиваем слушатели для закрытия попапов и добавляем плавность
popups.forEach(elem => {
  attachEventListener(elem);
  elem.classList.add('popup_is-animated');
});

// редактирование профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// добавление новой карточки через форму
cardForm.addEventListener('submit', handleCardFormSubmit);




