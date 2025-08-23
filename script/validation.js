 const settings =  {
  formSelector: ".formlogin, .formLogin",     
  inputSelector: ".modal__label",             
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",  
  inputErrorClass: "modal__label_type_error",         
  errorClass: "form__error_visible"   
};

// show || hide error
const checkInput = (form, input) =>  {
    const error = form.querySelector(`#${input.id}-error`);
    if (!input.validity.valid)  {
        input.classList.add(settings.inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(settings.errorClass);    
    } else  {
        input.classList.remove(settings.inputErrorClass);
        error.textContent = '';
        error.classList.remove(settings.errorClass);

    }
};


// eneble/disable button
const toggleButton = (inputs, button) =>  {
    const invalid = inputs.some(i => !i.validity.valid);
    button.disabled = invalid;
    button.classList.toggle(settings.inactiveButtonClass, invalid);

};

// Set listeners on inputs
const setListeners = (form) =>  {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    toggleButton(inputs, button);
    inputs.forEach(input => input.addEventListener('input', () => {
        checkInput(form, input);
        toggleButton(inputs, button);

    }));  
};

// enable validation for all forms
const enableValidation = () =>  {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form =>  {
        form.addEventListener('submit', e => e.preventDefault());
        setListeners(form);
    });  
};

enableValidation();