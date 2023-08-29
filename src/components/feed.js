// import { onAuthStateChanged } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../firebase.js'; // aca se importa tambien db más adelante
import { addPost, logOut, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  const generalFeed = document.createElement('section');
  const sectionHeader = document.createElement('header');
  sectionHeader.classList.add('headerClass');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-home.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImgFeed');
  const buttonLogout = document.createElement('button');
  buttonLogout.classList.add('button-logout');
  buttonLogout.textContent = 'Cerrar sesión';
  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');
  const textArea = document.createElement('textarea');
  textArea.classList.add('text-area');
  const sendPostButton = document.createElement('button');
  sendPostButton.classList.add('sendPost-button');
  sendPostButton.textContent = 'Publicar';
  const postsSection = document.createElement('section');
  postsSection.setAttribute('id', 'post-section');

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
    } else {
      alert('Please write something');
    }
  });
  // logOut es nuestra funcion que hicimos en index.js para cerrar sesión
  buttonLogout.addEventListener('click', () => {
    logOut();
  });

  generalFeed.append(sectionHeader, textAreaSection, postsSection);
  sectionHeader.append(sectionLogo, buttonLogout);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  return generalFeed;
}

export default feed;
