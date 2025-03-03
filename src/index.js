// импорты
import './pages/index.css';

import { getFromServer, PATH, myToken, renderError, renderLoading, patchToServer, postToServer, deleteFromServer } from './scripts/api.js';
import { makeCard, removeElement, likeCard } from './scripts/card';
import { openModal, closeModal, attachEventListener } from './scripts/modal';


// переменные 

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


// объявление функций

// функция отрисовки текста профиля
const renderProfileText = (data) => {
  userName.textContent = data.name;
  userAbout.textContent = data.about;
}
// функция отрисовки аватара профиля
const renderAvatar = data => {
  userAvatar.style = `background-image: url(${data.avatar});`;
}

// функция отрисовки профиля 
const renderProfile = (data) => {
  renderProfileText(data);
  renderAvatar(data);  
}

// функция добавления карточки в начало списка
const addСardToTop = () => {
  
}

// функция отрисовки страницы
const renderPage = () => {
  renderLoading(loader, true);
  renderProfile({});
  Promise.all([getFromServer(PATH, 'cards', myToken), getFromServer(PATH, 'users/me', myToken)])
    .then(([cardsData, userData]) => {
       contentLoadingError.textContent = '';
       cardsData.forEach(cardData => placesList.append(makeCard(cardData, removeCard, likeCard, openImagePopup, userData._id)));
       renderProfile(userData);
    })
    .catch(err => {
      renderError(contentLoadingError, `Ошибка: ${err}`);
      renderProfile({});
    })
    .finally(() => {
      renderLoading(loader, false);
    });
};
 
// функция редактирования профиля
const editProfile = (evt) => {
  evt.preventDefault();
  patchToServer(PATH, 'users/me', myToken, {name: userNameInput.value, about: userAboutInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    renderProfileText(data);
  })
  .catch(err => {
    renderError(contentLoadingError, `Ошибка: ${err}`);
  })
  closeModal(profilePopup);
};

// функция добавления карточки через форму
const addCard = (evt) => {
  evt.preventDefault();
  postToServer(PATH, 'cards', myToken, {name: cardPlaceNameInput.value, link: cardUrlInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    placesList.prepend(makeCard(data, removeCard, likeCard, openImagePopup, data.owner._id));
  })
  .catch(err => {
    renderError(contentLoadingError, `Ошибка: ${err}`);
  })
  evt.target.reset();
  closeModal(newCardPopup);
};

// функция удаления карточки
const removeCard = (cardData, card) => {
  deleteFromServer(PATH, `cards/${cardData._id}`, myToken)
  .then(() => {
    removeElement(card);
  })
  .catch(err => {
    renderError(contentLoadingError, `Ошибка: ${err}`);
  })
}

// функция увеличения картинки при клике на нее
const openImagePopup = (cardData) => {
  openModal(imagePopup);
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  popupImage.alt = cardData.name;
};

// слушатели

// навешиваем слушатели для открытия попапов
profileEditBtn.addEventListener('click', (evt) => {
  userNameInput.value = userName.textContent;
  userAboutInput.value = userAbout.textContent;
  openModal(profilePopup);
});

profileAddBtn.addEventListener('click', (evt) => openModal(newCardPopup));

// навешиваем слушатели для закрытия попапов и добавляем плавность при открытии/закрытии
document.querySelectorAll('.popup').forEach(elem => {
  attachEventListener(elem);
  elem.classList.add('popup_is-animated');
});

// навешиваем слушатель для редактирования профиля
profileForm.addEventListener('submit', editProfile);

// навешиваем слушатель для добавления новой карточки через форму
cardForm.addEventListener('submit', addCard);

// события 

// загружаем с сервера и отрисовываем карточки при обновлении страницы
renderPage();






