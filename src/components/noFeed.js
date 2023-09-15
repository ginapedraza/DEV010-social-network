import logoHome from '../images/logoHome.png';
import atencion from '../images/atencion.png';

function noFeed(navigateTo) {
  const noFeedSection = document.createElement('section');
  const sectionHeader = document.createElement('header');
  sectionHeader.classList.add('headerNoFeed');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section-noFeed');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoHome;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImgNoFeed');
  const buttonhome = document.createElement('button');
  buttonhome.classList.add('button-home-nofeed');
  buttonhome.textContent = 'Volver';
  const messageSection = document.createElement('section');
  messageSection.classList.add('message-section');
  const imageWarning = document.createElement('img');
  imageWarning.src = atencion;
  imageWarning.alt = ' ';
  imageWarning.classList.add('logoWarning');
  const messageToHome = document.createElement('h5');
  messageToHome.classList.add('message-tohome');
  messageToHome.textContent = 'Aún no has iniciado sesión, por favor vuelve al inicio para que puedas acceder al contenido de la web.';

  buttonhome.addEventListener('click', () => {
    navigateTo('/');
  });

  noFeedSection.append(sectionHeader, messageSection);
  sectionHeader.append(sectionLogo);
  sectionLogo.append(imageLogo);
  messageSection.append(imageWarning, messageToHome, buttonhome);

  return noFeedSection;
}
export default noFeed;
