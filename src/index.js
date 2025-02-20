// импорты
import './pages/index.css';

import { initialCards } from './scripts/cards';
import { makeCard, removeCard, likeCard } from './scripts/card';
import { openModal, closeModal, attachEventListener } from './scripts/modal';


// переменные 

// элементы
const placesList = document.querySelector('.places__list');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');


// кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// попапы
const imagePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');

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
  placesList.prepend(makeCard({name: cardPlaceNameInput.value, link: cardUrlInput.value}, removeCard, likeCard, openImagePopup));
  evt.target.reset();
  closeModal(newCardPopup);
};

// функция увеличения картинки при клике на нее
const openImagePopup = (cardData) => {
  openModal(imagePopup);
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  popupImage.alt = cardData.name;
}

// события 

// добавляем карточки на страницу из массива при обновлении страницы
initialCards.forEach(elem => {
  placesList.append(makeCard(elem, removeCard, likeCard, openImagePopup))
});

// навешиваем слушатели для открытия попапов
profileEditBtn.addEventListener('click', (evt) => {
  userNameInput.value = userName.textContent;
  userAboutInput.value = userAbout.textContent;
  openModal(profilePopup);
});

profileAddBtn.addEventListener('click', (evt) => {
  openModal(newCardPopup);
  });

//навешиваем слушатели для закрытия попапов и добавляем плавность при открытии/закрытии
popups.forEach(elem => {
  attachEventListener(elem);
  elem.classList.add('popup_is-animated');
});

// редактирование профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// добавление новой карточки через форму
cardForm.addEventListener('submit', handleCardFormSubmit);




