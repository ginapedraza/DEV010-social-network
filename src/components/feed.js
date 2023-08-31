// import { onAuthStateChanged } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../firebase.js'; // aca se importa tambien db más adelante
import { addPost, logOut, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  const generalFeed = document.createElement('section');
  generalFeed.setAttribute('id', 'general-section');
  const sectionHeader = document.createElement('header');
  sectionHeader.classList.add('headerClass');
  const accessibilitySection = document.createElement('section');
  accessibilitySection.classList.add('accessibility-section');
  const reduceButton = document.createElement('img');
  reduceButton.src = '/images/a-.png';
  reduceButton.alt = 'Disminuir tamaño de la fuente';
  reduceButton.classList.add('button-size');
  const increaseButton = document.createElement('img');
  increaseButton.src = '/images/a+.png';
  increaseButton.alt = 'Aumentar tamaño de la fuente';
  increaseButton.classList.add('button-size');
  const normalButton = document.createElement('img');
  normalButton.src = '/images/a.png';
  normalButton.alt = 'Tamaño normal de la fuente';
  normalButton.classList.add('button-size');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-home.png';
  imageLogo.alt = ' ';
  imageLogo.classList.add('logoImgFeed');
  const sectionLogOut = document.createElement('section');
  sectionLogOut.classList.add('section-logout');
  const buttonLogout = document.createElement('button');
  buttonLogout.classList.add('button-logout');
  buttonLogout.textContent = 'Cerrar sesión';
  const imgLogout = document.createElement('img');
  imgLogout.src = '/images/log-out.png';
  imgLogout.alt = 'Cerrar sesión';
  imgLogout.classList.add('img-logout');
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

  /* const dateSize = document.querySelector('.date');
  const userSize = document.querySelector('.user-name');
  const postSize = document.querySelector('.user-post'); */

  let name = '';
  // Manejador para detectar el estado de autenticación
  onAuthStateChanged(auth, async (user) => {
    // console.log(`inside promise: ${user.displayName}`);
    if (user) {
      // Mostrar los posts del usuario autenticado
      // console.log(user.displayName);
      // console.log(user);
      name = user.displayName;
      await showPosts(name, postsSection);
    } else {
      navigateTo('/noFeed');
    }
  });
  if (textArea.value === '') {
    sendPostButton.disabled = true;
  }
  textArea.addEventListener('input', () => {
    if (textArea.value !== '') {
      sendPostButton.disabled = false;
    } else {
      sendPostButton.disabled = true;
    }
  });
  sendPostButton.addEventListener('click', () => {
    // console.log(user);

    const post = textArea.value;
    name = auth.currentUser.displayName;
    const date = Timestamp.now();

    if (post !== '') {
      addPost(name, post, date).then(() => {
        showPosts();
        textArea.value = '';
      });
    }
  });
  // logOut es nuestra funcion que hicimos en index.js para cerrar sesión
  buttonLogout.addEventListener('click', () => {
    logOut();
  });

  generalFeed.append(sectionHeader, textAreaSection, postsSection);
  sectionHeader.append(accessibilitySection, sectionLogo, sectionLogOut);
  accessibilitySection.append(reduceButton, normalButton, increaseButton);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  sectionLogOut.append(buttonLogout);
  buttonLogout.append(imgLogout);
  return generalFeed;
}

export default feed;
