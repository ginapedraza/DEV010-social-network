import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import logoLogin from '../images/logoLogin.png';

function resetPassword(navigateTo) {
  const resetPasswordSection = document.createElement('section');
  resetPasswordSection.classList.add('resetPassSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoLogin;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImg');
  const inputSection = document.createElement('section');
  inputSection.classList.add('input-section');
  const title = document.createElement('h3');
  const inputResetPass = document.createElement('input');
  inputResetPass.classList.add('input-resetpass');
  inputResetPass.setAttribute('id', 'inputresetpass');
  const buttonResetPass = document.createElement('button');
  buttonResetPass.classList.add('resetpass-button');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  inputResetPass.placeholder = 'Ingresa tu correo electrónico';
  const errorAlert = document.createElement('p');
  errorAlert.classList.add('error');

  title.textContent = '¿Olvidaste tu contraseña?';
  buttonResetPass.textContent = 'Enviar';
  buttonReturn.textContent = 'Volver';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/login');
  });

  buttonResetPass.addEventListener('click', async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, inputResetPass.value)
      .then(() => {
        errorAlert.textContent = 'Hemos enviado un link a tu correo para recuperar tu contraseña';
        buttonResetPass.textContent = 'Ir al inicio';
        buttonResetPass.addEventListener('click', () => {
          navigateTo('/login');
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          errorAlert.textContent = 'Correo electrónico no encontrado';
        }
        if (errorCode !== 'auth/user-not-found') {
          errorAlert.textContent = 'Hubo un error al recuperar tu contraseña';
        }
      });
  });
  resetPasswordSection.append(sectionLogo, inputSection);
  sectionLogo.append(imageLogo);
  inputSection.append(title, inputResetPass, errorAlert, buttonResetPass, buttonReturn);

  return resetPasswordSection;
}

export default resetPassword;
