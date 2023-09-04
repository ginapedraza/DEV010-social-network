import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../firebase.js'; // aca se importa tambien db más adelante
import {
  addPost, logOut, showPostsProfile,
} from '../lib/index.js';

function profile(navigateTo) {
  let name = '';
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
  reduceImg.src = '/images/a-.png';
  reduceImg.alt = 'Disminuir tamaño de la fuente';
  reduceImg.classList.add('button-size-img');
  const increaseButton = document.createElement('button');
  increaseButton.classList.add('button-size');
  increaseButton.setAttribute('id', 'increaseButton');
  const increaseImg = document.createElement('img');
  increaseImg.src = '/images/a+.png';
  increaseImg.alt = 'Aumentar tamaño de la fuente';
  increaseImg.classList.add('button-size-img');
  const normalButton = document.createElement('button');
  normalButton.classList.add('button-size');
  normalButton.setAttribute('id', 'normalButton');
  const normalImg = document.createElement('img');
  normalImg.src = '/images/a.png';
  normalImg.alt = 'Tamaño normal de la fuente';
  normalImg.classList.add('button-size-img');
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
  const buttonHome = document.createElement('button');
  buttonHome.classList.add('button-profile');
  buttonHome.textContent = 'Inicio';
  const imgHome = document.createElement('img');
  imgHome.src = '/images/ButtonHome.png';
  imgHome.alt = 'Ir a home';
  imgHome.classList.add('img-home');
  const profileTextSection = document.createElement('section');
  profileTextSection.classList.add('profiletext-section');
  const nameUser = document.createElement('h4');
  nameUser.classList.add('name-user');
  const imgProfile = document.createElement('img');
  imgProfile.classList.add('imgProfile');
  imgProfile.alt = 'Foto de perfil';
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

  buttonHome.addEventListener('click', () => {
    navigateTo('/feed');
  });

  onAuthStateChanged(auth, async (user) => {
    // console.log(`inside promise: ${user.displayName}`);
    if (user) {
      // Mostrar los posts del usuario autenticado
      // console.log(user.displayName);
      // console.log(user);
      const photo = auth.currentUser.photoURL;
      name = user.displayName;
      nameUser.textContent = auth.currentUser.displayName;
      imgProfile.src = photo;
      if (photo === null) {
        imgProfile.src = '/images/defaultProfile.png';
      }
      await showPostsProfile(name, postsSection);
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
        showPostsProfile();
        textArea.value = '';
      });
    }
  });
  buttonLogout.addEventListener('click', () => {
    logOut();
  });
  generalFeed.append(sectionHeader, backgroundSection);
  sectionHeader.append(accessibilitySection, sectionLogo, sectionLogOut);
  backgroundSection.append(profileTextSection, textAreaSection, postsSection);
  accessibilitySection.append(reduceButton, normalButton, increaseButton);
  normalButton.append(normalImg);
  reduceButton.append(reduceImg);
  increaseButton.append(increaseImg);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  sectionLogOut.append(buttonHome, buttonLogout);
  buttonHome.append(imgHome);
  buttonLogout.append(imgLogout);
  profileTextSection.append(imgProfile, nameUser);
  return generalFeed;
}

export default profile;
