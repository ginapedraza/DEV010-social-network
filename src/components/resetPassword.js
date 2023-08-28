import { restorePassword } from '../lib/index';

function resetPassword(navigateTo) {
  const resetPasswordSection = document.createElement('section');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const inputSection = document.createElement('section');
  inputSection.classList.add('input-section');
  const title = document.createElement('h2');
  const inputResetPass = document.createElement('input');
  inputResetPass.classList.add('input-resetpass');
  inputResetPass.setAttribute('id', 'inputresetpass');
  const buttonResetPass = document.createElement('button');
  buttonResetPass.classList.add('resetpass-button');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('button-return');
  inputResetPass.placeholder = 'Ingresa tu correo electrónico';

  title.textContent = '¿Olvidaste tu contraseña?';
  buttonResetPass.textContent = 'Ingresar';
  buttonReturn.textContent = 'Volver';

  buttonResetPass.addEventListener('click', async (e) => {
    e.preventDefault();

    const passwordReset = await restorePassword(inputResetPass.value);
    if (passwordReset !== undefined) {
      alert('Hemos enviado un link a tu correo para recuperar tu contraseña');
      navigateTo('/login');
    } else {
      alert('Hubo un error al recuperar tu contraseña');
    }
  });
  resetPasswordSection.append(sectionLogo, inputSection);
  sectionLogo.append(imageLogo);
  inputSection.append(title, inputResetPass, buttonResetPass, buttonReturn);

  return resetPasswordSection;
}

export default resetPassword;
