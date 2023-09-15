import logoHome from '../images/logoHome.png';

function mailVerificacion(navigateTo) {
  const verificationSection = document.createElement('section');
  verificationSection.classList.add('verification-section');
  const sectionHeader = document.createElement('header');
  sectionHeader.classList.add('headerClass');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoHome;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImgNoFeed');
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('button-home-nofeed');
  buttonLogin.textContent = 'Ya verifiqué mi correo';
  const messageSection = document.createElement('section');
  messageSection.classList.add('message-section');
  const messageToHome = document.createElement('h5');
  messageToHome.classList.add('message-tohome');
  messageToHome.textContent = 'Hemos enviado el link de verificación a tu correo. Revisa la bandeja de entrada y verifica tu email';

  buttonLogin.addEventListener('click', () => {
    navigateTo('/login');
  });

  verificationSection.append(sectionHeader, messageSection);
  sectionHeader.append(sectionLogo);
  sectionLogo.append(imageLogo);
  messageSection.append(messageToHome, buttonLogin);

  return verificationSection;
}

export default mailVerificacion;
