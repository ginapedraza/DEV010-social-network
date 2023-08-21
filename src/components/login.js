/* eslint-disable no-alert */
import { signIn } from '../firebase';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('loginSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('generalLogin');
  const title = document.createElement('h2');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-login');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-login');
  inputPass.type = 'password';
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('login-button');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  // const getEmail = inputEmail.value;
  // const getPass = inputPass.value;

  title.textContent = 'Inicia sesión';
  buttonLogin.textContent = 'Ingresar';

  buttonReturn.textContent = 'Volver atrás';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const getEmail = inputEmail.value;
    const getPass = inputPass.value;

    try {
      const userCredential = await signIn(getEmail, getPass);
      if (userCredential.user.emailVerified) {
        // El usuario está autenticado y su correo está verificado.
        navigateTo('/feed');
      } else {
        alert('Aun no verificas tu email');
      }
    } catch (error) {
      // Manejar el error de autenticación o verificación de correo aquí.
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado. Verifica tus credenciales.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Verifica tus credenciales.');
      } else if (error.code === 'auth/user-disabled') {
        alert('Tu cuenta ha sido deshabilitada. Contacta al soporte.');
      } else if (error.code === 'auth/user-mismatch') {
        alert('Hay un problema con tu cuenta. Contacta al soporte.');
      } else {
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
      }
    }
  });

  sectionLogo.append(imageLogo);
  sectionGeneral.append(title, inputEmail, inputPass, buttonLogin, buttonReturn);
  section.append(sectionLogo, sectionGeneral);

  return section;
}

export default login;
