import { el, mount } from 'redom';
import Inputmask from 'inputmask';
import cardValidator from 'card-validator';
import emailValidator from 'email-validator';


// Создание элементов формы
const form = el('form', { onsubmit: handleSubmit, onchange: validateForm },
  el('label', 'Card Number'),
  el('input#cardNumber', { type: 'text', placeholder: '1234 5678 9012 3456', onblur: validateCard, oninput: onInputCard }),
  el('div.errorMessage', 'Invalid card number'),

  el('label', 'Expiration Date (MM/YY)'),
  el('input#expDate', { type: 'text', placeholder: 'MM/YY', onblur: validateDate, oninput: onInputDate }),
  el('div.errorMessage', 'Invalid expiration date'),

  el('label', 'CVC/CVV'),
  el('input#cvc', { type: 'text', placeholder: '123', onblur: validateCVC, oninput: onInputCvc }),
  el('div.errorMessage', 'Invalid CVC/CVV'),

  el('label', 'Email'),
  el('input#email', { type: 'email', placeholder: 'example@example.com', onblur: validateEmail, oninput: onInputEmail }),
  el('div.errorMessage', 'Invalid email'),

  el('button#submitButton',{ type: 'submit', disabled: true }, 'Submit')
);

// Монтирование формы на страницу
mount(document.getElementById('app'), form);

// get inputs
const inputCard = document.getElementById('cardNumber');
const inputDate = document.getElementById('expDate');
const inputCvc = document.getElementById('cvc');
const inputEmail = document.getElementById('email');
const submitButton = document.getElementById('submitButton');

// Маски для полей ввода
Inputmask("9999 9999 9999 9999[ 9999]").mask(inputCard);
Inputmask("99/99").mask(inputDate);
Inputmask("999").mask(inputCvc);

// Функция валидации формы
function validateForm() {
  if (isCardValid() && isExpDateValid() && isCvcValid() && isEmailValid()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

const isCardValid = () => cardValidator.number(inputCard.value).isValid;
const isExpDateValid = () => cardValidator.expirationDate(inputDate.value).isValid;
const isCvcValid = () => /^[0-9]{3,4}$/.test(inputCvc.value);
const isEmailValid = () => emailValidator.validate(inputEmail.value);

// Валидация карты
function validateCard() {
  if (!isCardValid()) {
    inputCard.classList.add('error');
  }
}
function onInputCard() {
  inputCard.classList.remove('error');
}

// Валидация даты
function validateDate() {
  if (!isExpDateValid()) {
    inputDate.classList.add('error');
  }
}
function onInputDate() {
  inputDate.classList.remove('error');
}

// Валидация CVC
function validateCVC() {
  if (!isCvcValid()) {
    inputCvc.classList.add('error');
  }
}
function onInputCvc() {
  inputCvc.classList.remove('error');
}

// Валидация Email
function validateEmail() {
  if (!isEmailValid()) {
    inputEmail.classList.add('error');
  }
}
function onInputEmail() {
  inputEmail.classList.remove('error');
}

//Обработка отправки формы
function handleSubmit(event) {
  event.preventDefault();
  alert('Payment successful');
}
