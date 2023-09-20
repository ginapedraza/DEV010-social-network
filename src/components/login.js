import { signIn } from '../lib/index.js';
import logoLogin from '../images/logoLogin.png';
import blackEye from '../images/blackEye.png';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('loginSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoLogin;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImg');
  const slogan = document.createElement('h7');
  slogan.classList.add('sloganstyle');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('generalLogin');
  const title = document.createElement('h2');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-login');
  inputEmail.setAttribute('id', 'inputEmail');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-register-pass');
  inputPass.setAttribute('id', 'inputPass');
  inputPass.type = 'password';
  const passButton = document.createElement('button');
  passButton.classList.add('pass-button');
  const passSection = document.createElement('section');
  passSection.classList.add('pass-section');
  const passImg = document.createElement('img');
  passImg.classList.add('pass-img');
  passImg.src = blackEye;
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('login-button');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  const errorAlert = document.createElement('p');
  errorAlert.classList.add('error');
  const resetpassSection = document.createElement('section');
  resetpassSection.classList.add('resetpass-section');
  const restorePass = document.createElement('p');
  restorePass.classList.add('restorePassP');
  const resetPass = document.createElement('a');
  resetPass.classList.add('restorePassA');
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  resetPass.textContent = '¿Olvidaste tu contraseña?';
  restorePass.textContent = 'Recupérala aquí';
  title.textContent = 'Inicia sesión';
  buttonLogin.textContent = 'Ingresar';
  slogan.textContent = '¡Juntos podemos lograr grandes resultados!';
  buttonReturn.textContent = 'Volver atrás';

  let click = false;
  passButton.addEventListener('click', (e) => {
    e.preventDefault();
    // verifica si la variable "click" es falsa. Si es así, cambia el tipo de entrada
    //  de "inputPass" a "text" y establece la variable "click" en verdadera.
    // Si la variable "click" es verdadera, cambia el tipo de entrada de "inputPass"
    // a "password" y establece la variable "click" en falsa.
    if (!click) {
      inputPass.type = 'text';
      click = true;
    } else if (click) {
      inputPass.type = 'password';
      click = false;
    }
  });
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  restorePass.addEventListener('click', () => {
    navigateTo('/resetPassword');
  });
  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const getEmail = inputEmail.value;
    const getPass = inputPass.value;
    // se intenta iniciar sesión con esos datos utilizando la función "signIn"
    try {
      const userCredential = await signIn(getEmail, getPass);
      // Si el correo del usuario está verificado, se redirige al usuario a la página "/feed".
      if (userCredential.user.emailVerified) {
        // El usuario está autenticado y su correo está verificado.
        navigateTo('/feed');
      }
      // Si el correo no está verificado, se muestra un mensaje de error.
      if (userCredential.user.emailVerified === false) {
        errorAlert.textContent = 'Aun no verificas tu email';
      }
      // Captura un error
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        errorAlert.textContent = 'Usuario no encontrado. Verifica tus credenciales.';
      }
      if (errorCode === 'auth/wrong-password') {
        errorAlert.textContent = 'Contraseña incorrecta. Verifica tus datos.';
      }
      if (errorCode === 'auth/user-disabled') {
        errorAlert.textContent = 'Tu cuenta ha sido deshabilitada.';
      }
    }
  });

  sectionLogo.append(imageLogo, slogan);
  // eslint-disable-next-line max-len
  sectionGeneral.append(title, inputEmail, passSection, errorAlert, buttonLogin, buttonReturn, resetpassSection);
  passSection.append(inputPass, passButton);
  passButton.append(passImg);
  section.append(sectionLogo, sectionGeneral);
  resetpassSection.append(resetPass, restorePass);

  return section;
}

export default login;
