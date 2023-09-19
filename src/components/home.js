import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { loginWithGoogle } from '../lib/index';
import logoHome from '../images/logoHome.png';
import LogoGoogle from '../images/LogoGoogle.png';

function home(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('homeSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoHome;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImg');
  const slogan = document.createElement('h2');
  slogan.classList.add('slogan-style');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('general');
  const titleLogin = document.createElement('h2');
  const emailButton = document.createElement('button');
  emailButton.classList.add('loginButton');
  const googleButton = document.createElement('button');
  googleButton.classList.add('googleButton');
  const titleRegister = document.createElement('h3');
  const registerButton = document.createElement('button');
  registerButton.classList.add('registerButton');
  const googleImg = document.createElement('img');
  googleImg.classList.add('google-img');
  googleImg.src = LogoGoogle;
  const googleText = document.createElement('p');
  googleText.classList.add('google-text');
  googleText.textContent = 'Acceder con Google';

  slogan.textContent = '¡Comparte tus éxitos, inspira tu Fitness!';
  emailButton.textContent = 'Correo electrónico';
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
    loginWithGoogle().then(() => {
      navigateTo('/feed');
    });
  });
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      navigateTo('/feed');
    }
  });
  sectionLogo.append(imageLogo, slogan);
  sectionGeneral.append(titleLogin, emailButton, googleButton, titleRegister, registerButton);
  googleButton.append(googleImg, googleText);
  section.append(sectionLogo, sectionGeneral);
  return section;
}

export default home;
