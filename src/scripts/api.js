export const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-33/';
export const myToken = '70807b98-506a-49fd-a2c7-9ad6c06cb9a2';

export const sendRequestToServer = (PATH, dataPath, myToken, method, data) => {
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

export const getFromServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'GET');
};

export const postToServer = (dataPath, data) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'POST', data);
};

export const patchToServer = (dataPath, data) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'PATCH', data);
};

export const deleteFromServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'DELETE');
};

export const putToServer = (dataPath) => {
  return sendRequestToServer(PATH, dataPath, myToken, 'PUT');
}

export const likeApi = (cardId) => {
  return putToServer(`cards/likes/${cardId}`);
}

export const dislikeApi = (cardId) => {
  return deleteFromServer(`cards/likes/${cardId}`);
}

/*export const validateImage = (imageUri) => {
  return fetch(imageUri, {
    method: 'HEAD',
    headers: {
    'X-Content-Type-Options': 'nosniff',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(res.status);
    })
};*/
