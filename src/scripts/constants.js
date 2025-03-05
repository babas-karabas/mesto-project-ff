export { 
  placesList, 
  popupCaption, 
  popupImage, 
  userName, 
  userAbout, 
  userAvatar, 
  loader, 
  contentLoadingError, 
  profileAddBtn, 
  profileEditBtn, 
  imagePopup,
  newCardPopup,
  profilePopup,
  profileForm,
  cardForm,
  userNameInput,
  userAboutInput,
  cardUrlInput,
  cardPlaceNameInput 
} 

// элементы
const placesList = document.querySelector('.places__list');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

const loader = document.querySelector('.loader');
const contentLoadingError = document.querySelector('.error');

// кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// попапы
const imagePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profilePopup = document.querySelector('.popup_type_edit');

// формы и инпуты
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

const userNameInput = profileForm.elements.name;
const userAboutInput = profileForm.elements.description;

const cardUrlInput = cardForm.elements.link;
const cardPlaceNameInput = cardForm.elements['place-name'];


