import { loginWithGoogle } from '../firebase.js';

function home(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('homeSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('general');
  const titleLogin = document.createElement('h2');
  const emailButton = document.createElement('button');
  emailButton.classList.add('loginButton');
  const googleButton = document.createElement('button');
  googleButton.classList.add('loginButton');
  const titleRegister = document.createElement('h3');
  const registerButton = document.createElement('button');
  registerButton.classList.add('registerButton');

  emailButton.textContent = 'Correo electrónico';
  googleButton.textContent = 'Google';
  titleLogin.textContent = 'Inicia sesión';
  titleRegister.textContent = 'Si no tienes cuenta';
  registerButton.textContent = 'Regístrate';

  emailButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  registerButton.addEventListener('click', () => {
    navigateTo('/register');
  });

  googleButton.addEventListener('click', () => {
    loginWithGoogle();
  });

  sectionGeneral.append(titleLogin, emailButton, googleButton, titleRegister, registerButton);
  section.append(sectionLogo, sectionGeneral);
  return section;
}

export default home;
