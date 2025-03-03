export const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-33/';
export const myToken = '70807b98-506a-49fd-a2c7-9ad6c06cb9a2';

export const renderError = (errorElement, err) => {
  errorElement.textContent = err;
};

export const renderLoading = (loaderElement, isLoading, ) => {
  if (isLoading) {
    loaderElement.classList.add('loader_is-visible');
  } else {
    loaderElement.classList.remove('loader_is-visible');
  }
}

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
}


export const getFromServer = (PATH, dataUri, myToken) => {
  return fetch(`${PATH}${dataUri}`, {
  headers: {
    authorization: myToken
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(res.status);
    })
}

export const postToServer = (PATH, dataUri, myToken, data) => {
  return fetch(`${PATH}${dataUri}`, {
    method: 'POST',
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
}

export const patchToServer = (PATH, dataUri, myToken, data) => {
  return fetch(`${PATH}${dataUri}`, {
    method: 'PATCH',
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
}

export const deleteFromServer = (PATH, dataUri, myToken, data) => {
  return fetch(`${PATH}${dataUri}`, {
    method: 'DELETE',
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
}

