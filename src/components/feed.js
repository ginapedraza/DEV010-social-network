import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';
import { addPost, logOut, showPosts } from '../lib/index.js';
import logoHome from '../images/logoHome.png';
import ProfileButton from '../images/ProfileButton.png';
import reducir from '../images/reducir.png';
import aumentar from '../images/aumentar.png';
import letraNormal from '../images/letraNormal.png';
import logOutIcon from '../images/logOutIcon.svg';

function feed(navigateTo) {
  const generalFeed = document.createElement('section');
  generalFeed.setAttribute('id', 'general-section');
  const backgroundSection = document.createElement('section');
  backgroundSection.classList.add('background-Section');
  const sectionHeader = document.createElement('header');
  sectionHeader.classList.add('headerClass');
  const accessibilitySection = document.createElement('section');
  accessibilitySection.classList.add('accessibility-section');
  const reduceButton = document.createElement('button');
  reduceButton.classList.add('button-size');
  reduceButton.setAttribute('id', 'reduceButton');
  const reduceImg = document.createElement('img');
  reduceImg.src = reducir;
  reduceImg.alt = 'Disminuir tamaño de la fuente';
  reduceImg.classList.add('button-size-img');
  const increaseButton = document.createElement('button');
  increaseButton.classList.add('button-size');
  increaseButton.setAttribute('id', 'increaseButton');
  const increaseImg = document.createElement('img');
  increaseImg.src = aumentar;
  increaseImg.alt = 'Aumentar tamaño de la fuente';
  increaseImg.classList.add('button-size-img');
  const normalButton = document.createElement('button');
  normalButton.classList.add('button-size');
  normalButton.setAttribute('id', 'normalButton');
  const normalImg = document.createElement('img');
  normalImg.src = letraNormal;
  normalImg.alt = 'Tamaño normal de la fuente';
  normalImg.classList.add('button-size-img');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = logoHome;
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImgFeed');
  const sectionLogOut = document.createElement('section');
  sectionLogOut.classList.add('section-logout');
  const buttonLogout = document.createElement('button');
  buttonLogout.classList.add('button-logout');
  buttonLogout.textContent = 'Cerrar sesión';
  const imgLogout = document.createElement('img');
  imgLogout.src = logOutIcon;
  imgLogout.alt = 'Cerrar sesión';
  imgLogout.classList.add('img-logout');
  const buttonProfile = document.createElement('button');
  buttonProfile.classList.add('button-profile');
  const textButton = document.createElement('p');
  textButton.classList.add('text-button');
  const imgProfile = document.createElement('img');
  imgProfile.alt = 'Ir al perfil';
  imgProfile.classList.add('img-profile');
  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');
  const textArea = document.createElement('textarea');
  textArea.classList.add('text-area');
  textArea.placeholder = '¿Qué quieres compartir hoy?';
  const sendPostButton = document.createElement('button');
  sendPostButton.classList.add('sendPost-button');
  sendPostButton.textContent = 'Publicar';
  const postsSection = document.createElement('section');
  postsSection.setAttribute('id', 'post-section');

  let name = '';
  // Manejador para detectar el estado de autenticación
  onAuthStateChanged(auth, async (user) => {
    // Si el usuario está autenticado, se obtiene la foto del perfil del usuario actual
    if (user) {
      const photo = auth.currentUser.photoURL;
      imgProfile.src = photo;
      imgProfile.style.borderRadius = '50%';
      imgProfile.style.height = '40px';
      imgProfile.style.width = '40px';
      //  Si no hay foto de perfil, se establece una imagen predeterminada
      if (photo === null || photo === undefined) {
        imgProfile.src = ProfileButton;
      }
      // texto del botón para ir a perfil
      textButton.textContent = auth.currentUser.displayName;
      name = user.displayName;
      //  espera a que se muestren las publicaciones llamando a la función showPosts
      await showPosts(name, postsSection);
      // Si el usuario no está autenticado, se redirige a la página '/noFeed'.
    } else {
      navigateTo('/noFeed');
    }
  });
  // Botón deshabilitado
  if (textArea.value === '') {
    sendPostButton.disabled = true;
  }
  // Evento que escucha cambios en textarea
  textArea.addEventListener('input', () => {
    if (textArea.value !== '') {
      sendPostButton.disabled = false;
    } else {
      sendPostButton.disabled = true;
    }
  });
  sendPostButton.addEventListener('click', () => {
    const post = textArea.value;
    if (post !== '') {
      // si textarea no está vacío, se llama a la función addPost
      addPost(post).then(() => {
        // cuando la función addPost se resuelve exitosamente, se llama a la función showPosts
        // y se borra el contenido del área de texto.
        showPosts();
        textArea.value = '';
      });
    }
  });
  buttonLogout.addEventListener('click', () => {
    logOut();
  });
  buttonProfile.addEventListener('click', () => {
    navigateTo('/profile');
  });

  generalFeed.append(sectionHeader, backgroundSection);
  sectionHeader.append(accessibilitySection, sectionLogo, sectionLogOut);
  backgroundSection.append(textAreaSection, postsSection);
  accessibilitySection.append(reduceButton, normalButton, increaseButton);
  normalButton.append(normalImg);
  reduceButton.append(reduceImg);
  increaseButton.append(increaseImg);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  sectionLogOut.append(buttonProfile, buttonLogout);
  buttonProfile.append(imgProfile, textButton);
  buttonLogout.append(imgLogout);
  return generalFeed;
}

export default feed;
