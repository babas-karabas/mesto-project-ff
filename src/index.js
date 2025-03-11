// импорты
import './pages/index.css';

import { placesList, popupCaption, popupImage, userName, userAbout, userAvatar, spinner, contentLoadingError, 
  profileAddBtn, profileEditBtn, profileImageBtn, cardDeleteSubmitBtn, cardImagePopup, newCardPopup, profileTextPopup, 
  profileImagePopup, cardDeletePopup, profileTextForm, profileImageForm, cardForm, userNameInput, userAboutInput, 
  avatarInput, cardUrlInput, cardPlaceNameInput, validationConfig } from './scripts/constants';
import { patchToServer, postToServer, deleteFromServer, deleteLike, putLike, 
  getCardsData, getMyData, sendProfileInfo, sendAvatar, postCard, deleteCardFromServer } from './scripts/api.js';
import { makeCard, removeElement, handleLikeClick } from './scripts/card';
import { openModal, closeModal, attachEventListener } from './scripts/modal';
import { renderError, renderSpinner, renderSaving } from './scripts/utilits';
import { enableValidation, clearValidation } from './scripts/validation.js';


// объявление функций

// функция отрисовки текста профиля
const renderProfileText = (data) => {
  userName.textContent = data.name;
  userAbout.textContent = data.about;
}

// функция отрисовки аватара профиля
const renderAvatar = (data) => {
  userAvatar.src = data.avatar;
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
  renderSpinner(spinner, true);
  renderProfile({});
  Promise.all([getCardsData(), getMyData()])
    .then(([cardsData, userData]) => {
       contentLoadingError.textContent = '';
       cardsData.forEach(cardData => addСardToEnd(makeCard(cardData, handleRemoveCard, handleLikeClick(putLike, deleteLike), openCardImagePopup, userData._id), placesList));
       renderProfile(userData);
    })
    .catch(err => {
      renderError(contentLoadingError, `Ошибка: ${err}`);
      renderProfile({});
    })
    .finally(() => renderSpinner(spinner, false));
}
 
// функция редактирования текста профиля
const editProfileText = (evt) => {
  evt.preventDefault();
  renderSaving(evt.target, true);
  sendProfileInfo({name: userNameInput.value, about: userAboutInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    renderProfileText(data);
    closeModal(profileTextPopup);
    evt.target.reset();
  })
  .catch(err => renderError(contentLoadingError, `Ошибка: ${err}`))
  .finally(() => {
    renderSaving(evt.target, false);
  })
}

// функция замены аватарки
const editAvatar = (evt) => {
  evt.preventDefault();
  renderSaving(evt.target, true);
  sendAvatar({avatar: avatarInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    renderAvatar(data);
    closeModal(profileImagePopup);
    evt.target.reset();
  })
  .catch(err => renderError(contentLoadingError, `Ошибка: ${err}`))
  .finally(() => {
    renderSaving(evt.target, false);
  });
}

// функция добавления карточки через форму
const addCard = (evt) => {
  evt.preventDefault();
  renderSaving(evt.target, true);
  postCard({name: cardPlaceNameInput.value, link: cardUrlInput.value})
  .then(data => {
    contentLoadingError.textContent = '';
    addСardToTop(makeCard(data, handleRemoveCard, handleLikeClick(putLike, deleteLike), openCardImagePopup, data.owner._id), placesList);
    closeModal(newCardPopup);
    evt.target.reset();
  })
  .catch(err => renderError(contentLoadingError, `Ошибка: ${err}`))
  .finally(() => {
    renderSaving(evt.target, false); 
  })
}

// функция увеличения картинки при клике на нее
const openCardImagePopup = (cardData) => {
  openModal(cardImagePopup);
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  popupImage.alt = cardData.name;
}

// функция удаления карточки 
const handleRemoveCard = (cardData, cardElement) => {
  openModal(cardDeletePopup);
  cardDeleteSubmitBtn.onclick = () => deleteCardFromServer(cardData._id)
  .then(() => {
    removeElement(cardElement);
    closeModal(cardDeletePopup)
})
  .catch(err => renderError(contentLoadingError, `Ошибка: ${err}`))
}


// слушатели

// навешиваем слушатели для открытия попапов
// слушатель для открытия формы редактирования текста профиля
profileEditBtn.addEventListener('click', (evt) => {
  userNameInput.value = userName.textContent;
  userAboutInput.value = userAbout.textContent;
  openModal(profileTextPopup);
  clearValidation(profileTextForm, validationConfig); 
});

//слушатель для открытия формы добавления новой картинки
profileAddBtn.addEventListener('click', (evt) => {
  clearValidation(cardForm, validationConfig);
  openModal(newCardPopup);
});

//слушатель для открытия формы добавления нового аватара
profileImageBtn.addEventListener('click', (evt) => {
  clearValidation(profileImageForm, validationConfig);
  openModal(profileImagePopup);
});

// навешиваем слушатели для закрытия попапов и добавляем плавность при открытии/закрытии
document.querySelectorAll('.popup').forEach(elem => {
  attachEventListener(elem);
  elem.classList.add('popup_is-animated');
});

// навешиваем слушатель для подтверждения нового текста профиля
profileTextForm.addEventListener('submit', editProfileText);

// навешиваем слушатель для подтверждения новой аватарки
profileImageForm.addEventListener('submit', editAvatar);

// навешиваем слушатель для подтверждения добавления новой карточки через форму
cardForm.addEventListener('submit', addCard);

// события 

// загружаем с сервера и отрисовываем карточки при обновлении страницы
renderPage();

// валидируем формы
enableValidation(validationConfig);







