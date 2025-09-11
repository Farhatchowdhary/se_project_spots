// export const enableValidation = (settings) => {
//   formSelector: ".formlogin, .formLogin",     
//   inputSelector: ".modal__label",             
//   submitButtonSelector: ".modal__save-button",
//   inactiveButtonClass: "modal__save-button_disabled",  
//   inputErrorClass: "modal__label_type_error",         
//   errorClass: "form__error_visible"   
// };

// show || hide error
// export const enableValidation = (settings) => 
export const checkInput = (form, input, settings) => {
  const error = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(settings.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(settings.errorClass);    
  } else {
    input.classList.remove(settings.inputErrorClass);
    error.textContent = '';
    error.classList.remove(settings.errorClass);
  }
};


// eneble/disable button
export const toggleButton = (inputs, button, settings) => {
  const invalid = inputs.some(i => !i.validity.valid);
  button.disabled = invalid;
  button.classList.toggle(settings.inactiveButtonClass, invalid);
};

// Set listeners on inputs
export const setListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButton(inputs, button, settings);
  inputs.forEach(input => input.addEventListener('input', () => {
    checkInput(form, input, settings);
    toggleButton(inputs, button, settings);
  }));
};


// enable validation for all forms
export const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
    setListeners(form, settings);
  });
}

