export const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-33/';
export const myToken = '70807b98-506a-49fd-a2c7-9ad6c06cb9a2';

export const sendRequestToServer = (PATH, dataUri, myToken, method, data) => {
  return fetch(`${PATH}${dataUri}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
    authorization: myToken,
    'content-type': 'application/json; charset=UTF-8'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(res.status);
    })
};

export const getFromServer = (dataUri) => {
  return sendRequestToServer(PATH, dataUri, myToken, 'GET');
};

export const postToServer = (dataUri, data) => {
  return sendRequestToServer(PATH, dataUri, myToken, 'POST', data);
};

export const patchToServer = (dataUri, data) => {
  return sendRequestToServer(PATH, dataUri, myToken, 'PATCH', data);
};

export const deleteFromServer = (dataUri) => {
  return sendRequestToServer(PATH, dataUri, myToken, 'DELETE');
};

export const putToServer = (dataUri) => {
  return sendRequestToServer(PATH, dataUri, myToken, 'PUT');
}

export const likeApi = (cardId) => {
  return putToServer(`cards/likes/${cardId}`);
}

export const dislikeApi = (cardId) => {
  return deleteFromServer(`cards/likes/${cardId}`);
}