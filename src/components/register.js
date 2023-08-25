// import { getAuth } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import {
  createUser, auth,
} from '../firebase.js';

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
  inputEmail.setAttribute('id', 'inputEmail');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-register');
  inputPass.setAttribute('id', 'inputPass');
  inputPass.type = 'password';
  const sendEmailButton = document.createElement('button');
  sendEmailButton.classList.add('sendEmail');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  const errorAlert = document.createElement('p');
  errorAlert.classList.add('error');

  titleRegister.textContent = 'Regístrate';
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  buttonReturn.textContent = 'Volver atrás';

  sendEmailButton.textContent = 'Enviar';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  sendEmailButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    const messageAlert = document.querySelector('.error');
    try {
      await createUser(email, password);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          //     // Email verification sent!
          messageAlert.textContent = 'Hemos enviado el link de verificación a tu correo.';
        });
    } catch (error) {
      const errorCode = error.code;
      // const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        messageAlert.textContent = 'El correo proporcionado ya esta en uso.';
        // console.log(errorCode);
        // alert('El correo proporcionado ya esta en uso.');
      } else if (password.length < 6) {
        messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        // alert('La contraseña debe tener al menos 6 caracteres');
      } // else {
      // messageAlert.textContent = errorMessage;
      // alert(errorMessage);
      // }
      // ..
    }
  });

  // eslint-disable-next-line max-len
  sectionRegister.append(sectionLogo, generalRegister);
  sectionLogo.append(imageLogo);
  // eslint-disable-next-line max-len
  generalRegister.append(titleRegister, inputEmail, inputPass, errorAlert, sendEmailButton, buttonReturn);
  return sectionRegister;
}
export default register;
