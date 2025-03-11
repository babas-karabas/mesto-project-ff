export { 
  placesList, 
  popupCaption, 
  popupImage, 
  userName, 
  userAbout, 
  userAvatar, 
  spinner, 
  contentLoadingError, 
  profileAddBtn, 
  profileEditBtn, 
  profileImageBtn,
  cardDeleteSubmitBtn,
  cardImagePopup,
  newCardPopup,
  profileTextPopup,
  profileImagePopup,
  cardDeletePopup,
  profileTextForm,
  profileImageForm,
  cardForm,
  userNameInput,
  userAboutInput,
  avatarInput,
  cardUrlInput,
  cardPlaceNameInput,
  validationConfig 
} 

// элементы
const placesList = document.querySelector('.places__list');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

const spinner = document.querySelector('.spinner');
const contentLoadingError = document.querySelector('.error');

// кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileImageBtn = document.querySelector('.profile__image-button');

// попапы
const cardImagePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profileTextPopup = document.querySelector('.popup_type_edit');
const profileImagePopup = document.querySelector('.popup_type_avatar');
const cardDeletePopup = document.querySelector('.popup_type_delete-submit');

// формы и инпуты
const profileTextForm = document.forms['edit-profile'];
const profileImageForm = document.forms['edit-avatar'];
const cardForm = document.forms['new-place'];

const userNameInput = profileTextForm.elements.name;
const userAboutInput = profileTextForm.elements.description;

const avatarInput = profileImageForm.elements.link;

const cardUrlInput = cardForm.elements.link;
const cardPlaceNameInput = cardForm.elements['place-name'];

const cardDeleteSubmitBtn = cardDeletePopup.querySelector('.popup__button');

// настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


