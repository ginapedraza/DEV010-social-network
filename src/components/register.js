// import { getAuth } from 'firebase/auth';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import {
  createUser,
} from '../lib/index';
import { auth } from '../firebase.js';

function register(navigateTo) {
  const sectionRegister = document.createElement('section');
  sectionRegister.classList.add('registerSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const slogan = document.createElement('h7');
  slogan.classList.add('sloganstyle');
  const generalRegister = document.createElement('section');
  generalRegister.classList.add('generalRegister');
  const titleRegister = document.createElement('h2');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-register');
  inputEmail.setAttribute('id', 'inputEmail');
  const inputUser = document.createElement('input');
  inputUser.classList.add('input-register');
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
  inputUser.placeholder = 'Nombre de usuario';
  inputPass.placeholder = 'Contraseña';
  buttonReturn.textContent = 'Volver atrás';

  slogan.textContent = '¡Bienvenido/a a la aventura fit!';
  sendEmailButton.textContent = 'Enviar';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  sendEmailButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const name = inputUser.value;
    const password = inputPass.value;
    const messageAlert = document.querySelector('.error');
    try {
      const result = await createUser(email, password);
      await sendEmailVerification(auth.currentUser);

      await updateProfile(result.user, { displayName: name })
        .then(() => {
        //     // Email verification sent!
          navigateTo('/mailVerification');
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
  sectionLogo.append(imageLogo, slogan);
  // eslint-disable-next-line max-len
  generalRegister.append(titleRegister, inputEmail, inputUser, inputPass, errorAlert, sendEmailButton, buttonReturn);
  return sectionRegister;
}
export default register;
