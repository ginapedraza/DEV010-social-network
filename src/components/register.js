import { sendEmailVerification, updateProfile } from 'firebase/auth';
import {
  createUser,
} from '../lib/index';
import { auth } from '../firebase.js';
import blackEye from '../images/blackEye.png';
import logoLogin from '../images/logoLogin.png';

function register(navigateTo) {
  const sectionRegister = document.createElement('section');
  sectionRegister.classList.add('registerSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoLogin;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImg');
  const slogan = document.createElement('h7');
  slogan.classList.add('sloganstyle');
  const generalRegister = document.createElement('section');
  generalRegister.classList.add('generalRegister');
  const titleRegister = document.createElement('h2');
  const registerForm = document.createElement('form');
  registerForm.classList.add('register-form');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('input-register');
  inputEmail.setAttribute('id', 'inputEmail');
  const inputUser = document.createElement('input');
  inputUser.classList.add('input-register');
  inputUser.setAttribute('id', 'inputUser');
  const inputPass = document.createElement('input');
  inputPass.classList.add('input-register-pass');
  inputPass.setAttribute('id', 'inputPass');
  inputPass.type = 'password';
  const passButton = document.createElement('button');
  passButton.classList.add('pass-button');
  const confirmPassButton = document.createElement('button');
  confirmPassButton.classList.add('confirmpass-button');
  const passSection = document.createElement('section');
  passSection.classList.add('pass-section');
  const confirmPassSection = document.createElement('section');
  confirmPassSection.classList.add('confirmpass-section');
  const passImg = document.createElement('img');
  passImg.classList.add('pass-img');
  passImg.src = blackEye;
  const confirmPassImg = document.createElement('img');
  confirmPassImg.classList.add('confirmpass-img');
  confirmPassImg.src = blackEye;
  const inputConfirmPass = document.createElement('input');
  inputConfirmPass.classList.add('input-register-pass');
  inputConfirmPass.setAttribute('id', 'inputConfirmPass');
  inputConfirmPass.type = 'password';
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
  inputConfirmPass.placeholder = 'Repetir contraseña';
  buttonReturn.textContent = 'Volver atrás';
  slogan.textContent = '¡Bienvenido a la aventura fit!';
  sendEmailButton.textContent = 'Enviar';

  let click = false;
  passButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!click) {
      inputPass.type = 'text';
      click = true;
    } else if (click) {
      inputPass.type = 'password';
      click = false;
    }
  });
  confirmPassButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!click) {
      inputConfirmPass.type = 'text';
      click = true;
    } else if (click) {
      inputConfirmPass.type = 'password';
      click = false;
    }
  });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // eslint-disable-next-line consistent-return
  sendEmailButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const name = inputUser.value;
    const password = inputPass.value;
    const confirmPass = inputConfirmPass.value;
    // i la contraseña no coincide con la confirmación de contraseña,
    // se restablece el formulario y se muestra un mensaje de error
    // indicando que las contraseñas no coinciden.
    if (password !== confirmPass) {
      registerForm.reset();
      errorAlert.textContent = 'Las contraseñas no coinciden. Intenta nuevamente';
    }
    if (password === confirmPass) {
      try {
        // Se crea un nuevo usuario utilizando el correo electrónico y la contraseña proporcionados.
        const result = await createUser(email, password);
        // Se envía un correo electrónico de verificación al usuario actualmente autenticado.
        await sendEmailVerification(auth.currentUser);
        // Se actualiza el perfil del usuario con el nombre proporcionado.
        await updateProfile(result.user, { displayName: name })
          .then(() => {
            // se redirige al usuario a la página de verificación por correo electrónico.
            navigateTo('/mailVerification');
          });
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          errorAlert.textContent = 'El correo proporcionado ya esta en uso.';
          return errorAlert;
        }
        if (inputPass.value.length < 6) {
          errorAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
          return errorAlert;
        }
        if (inputUser.value.length === 0) {
          errorAlert.textContent = 'Debes ingresar un nombre de usuario';
          return errorAlert;
        }
        if (inputEmail.value.length === 0) {
          errorAlert.textContent = 'Debes ingresar tu email.';
          return errorAlert;
        }
      }
    }
  });

  // eslint-disable-next-line max-len
  sectionRegister.append(sectionLogo, generalRegister);
  sectionLogo.append(imageLogo, slogan);
  registerForm.append(inputEmail, inputUser, passSection, confirmPassSection);
  // eslint-disable-next-line max-len
  generalRegister.append(titleRegister, registerForm, errorAlert, sendEmailButton, buttonReturn);
  passSection.append(inputPass, passButton);
  confirmPassSection.append(inputConfirmPass, confirmPassButton);
  passButton.append(passImg);
  confirmPassButton.append(confirmPassImg);
  return sectionRegister;
}
export default register;
