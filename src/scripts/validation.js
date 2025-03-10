export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const enableValidation = ({formSelector, inputSelector, submitBtnSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const forms = document.querySelectorAll(formSelector);
  const form = document.querySelector(formSelector);
  
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEvtListeners(form, inputSelector, inputErrorClass, errorClass, submitBtnSelector, inactiveButtonClass);
  });
}

const setEvtListeners = (form, inputSelector, inputErrorClass, errorClass, submitBtnSelector, inactiveButtonClass) => {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitBtnElement = form.querySelector(submitBtnSelector); 
  
  toggleButtonState(inputs, submitBtnElement, inactiveButtonClass);

  inputs.forEach(input => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputs, submitBtnElement, inactiveButtonClass);
    })
  })
}

const showError = (form, input, inputErrorClass, errorClass, errorMessage) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
}

const hideError = (form, input, inputErrorClass, errorClass) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = '';
}

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorText);
  } else {
    input.setCustomValidity('');
}
  if (!input.validity.valid) {
    showError (form, input, inputErrorClass, errorClass, input.validationMessage);
  } else {
    hideError(form, input, inputErrorClass, errorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};


export const clearValidation = (profileForm, {formSelector, inputSelector, submitBtnSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const inputs = Array.from(profileForm.querySelectorAll(inputSelector));
  const submitBtnElement = profileForm.querySelector(submitBtnSelector); 

  inputs.forEach(input => hideError(profileForm, input, inputErrorClass, errorClass))
  toggleButtonState(inputs, submitBtnElement, inactiveButtonClass)
};