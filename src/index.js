// импорты
import './pages/index.css';

import { placesList, popupCaption, popupImage, userName, userAbout, userAvatar, loader, contentLoadingError, 
  profileAddBtn, profileEditBtn, imagePopup, newCardPopup, profilePopup, profileForm, cardForm,
  userNameInput, userAboutInput, cardUrlInput, cardPlaceNameInput } from './scripts/constants';
import { getFromServer, patchToServer, postToServer, deleteFromServer, putToServer, dislikeApi, likeApi } from './scripts/api.js';
import { makeCard, removeElement, handleLikeClick, removeCard } from './scripts/card';
import { openModal, closeModal, attachEventListener } from './scripts/modal';
import { renderError, renderLoading } from './scripts/utilits';


// объявление функций

// функция отрисовки текста профиля
const renderProfileText = (data) => {
  userName.textContent = data.name;
  userAbout.textContent = data.about;
}

// функция отрисовки аватара профиля
const renderAvatar = (data) => {
  userAvatar.style = `background-image: url(${data.avatar});`;
}

// функция отрисовки профиля 
const renderProfile = (data) => {
  renderProfileText(data);
  renderAvatar(data);  
}

// функция добавления карточки в начало списка
const addСardToTop = (card, container) => {
  container.prepend(card);
}

// функция добавления карточки в конец списка
const addСardToEnd = (card, container) => {
  container.append(card);
}

// функция отрисовки страницы
const renderPage = () => {
  renderLoading(loader, true);
  renderProfile({});
  Promise.all([getFromServer('cards'), getFromServer('users/me')])
    .then(([cardsData, userData]) => {
       contentLoadingError.textContent = '';
       cardsData.forEach(cardData => addСardToEnd(makeCard(cardData, removeCard(deleteFromServer, renderError, contentLoadingError), handleLikeClick(likeApi, dislikeApi), openImagePopup, userData._id), placesList));
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
  patchToServer('users/me', {name: userNameInput.value, about: userAboutInput.value})
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
  postToServer('cards', {name: cardPlaceNameInput.value, link: cardUrlInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    addСardToTop(makeCard(data, removeCard(deleteFromServer, renderError, contentLoadingError), handleLikeClick(likeApi, dislikeApi), openImagePopup, data.owner._id), placesList);
  })
  .catch(err => {
    renderError(contentLoadingError, `Ошибка: ${err}`);
  })
  evt.target.reset();
  closeModal(newCardPopup);
};


// функция увеличения картинки при клике на нее
const openImagePopup = (cardData) => {
  openModal(imagePopup);
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  popupImage.alt = cardData.name;
};

// слушатели

// навешиваем слушатели для открытия попапов
// слушатель для открытия формы редактирования текста профиля
profileEditBtn.addEventListener('click', (evt) => {
  userNameInput.value = userName.textContent;
  userAboutInput.value = userAbout.textContent;
  openModal(profilePopup);
});

//слушатель для открытия формы добавления новой картинки
profileAddBtn.addEventListener('click', (evt) => openModal(newCardPopup));

// навешиваем слушатели для закрытия попапов и добавляем плавность при открытии/закрытии
document.querySelectorAll('.popup').forEach(elem => {
  attachEventListener(elem);
  elem.classList.add('popup_is-animated');
});

// навешиваем слушатель для подтверждения нового текста профиля
profileForm.addEventListener('submit', editProfile);

// навешиваем слушатель для подтверждения добавления новой карточки через форму
cardForm.addEventListener('submit', addCard);

// события 

// загружаем с сервера и отрисовываем карточки при обновлении страницы
renderPage();







