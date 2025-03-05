export const renderError = (errorElement, err) => {
  errorElement.textContent = err;
};

export const renderLoading = (loaderElement, isLoading) => {
  if (isLoading) {
    loaderElement.classList.add('loader_is-visible');
  } else {
    loaderElement.classList.remove('loader_is-visible');
  }
};
