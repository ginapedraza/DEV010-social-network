import { createUser } from '../firebase.js';

function register(navigateTo) {
  const sectionRegister = document.createElement('section');
  sectionRegister.classList.add('registerSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const generalRegister = document.createElement('section');
  generalRegister.classList.add('generalRegister');
  const titleRegister = document.createElement('h2');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-register');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-register');
  inputPass.type = 'password';
  const sendEmailButton = document.createElement('button');
  sendEmailButton.classList.add('sendEmail');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');

  titleRegister.textContent = 'Regístrate';
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  buttonReturn.textContent = 'Volver atrás';

  sendEmailButton.textContent = 'Enviar';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  sendEmailButton.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    createUser(email, password);
  });

  // eslint-disable-next-line max-len
  sectionRegister.append(sectionLogo, generalRegister);
  sectionLogo.append(imageLogo);
  generalRegister.append(titleRegister, inputEmail, inputPass, sendEmailButton, buttonReturn);
  return sectionRegister;
}
export default register;
