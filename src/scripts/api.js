const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-33/';
const myToken = '70807b98-506a-49fd-a2c7-9ad6c06cb9a2';

const sendRequestToServer = (PATH, dataPath, myToken, method, data) => {
  return fetch(`${PATH}${dataPath}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
    authorization: myToken,
    'Content-Type': 'application/json; charset=UTF-8'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(res.status);
    })
};


const getFromServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'GET');
};

const postToServer = (dataPath, data) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'POST', data);
};

const patchToServer = (dataPath, data) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'PATCH', data);
};

const deleteFromServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'DELETE');
};

const putToServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'PUT');
}

export const putLike = (cardId) => putToServer(`cards/likes/${cardId}`);

export const deleteLike = (cardId) => deleteFromServer(`cards/likes/${cardId}`);

export const getCardsData = () => getFromServer('cards');

export const getMyData = () => getFromServer('users/me');

export const sendProfileInfo = (data) => patchToServer('users/me', data);

export const sendAvatar = (data) => patchToServer('users/me/avatar', data);

export const postCard = (data) => postToServer('cards', data);

export const deleteCardFromServer = (cardId) => deleteFromServer(`cards/${cardId}`)

