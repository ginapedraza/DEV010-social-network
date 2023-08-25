import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { savePost } from '../lib/index.js';

function feed() {
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

  sendPostButton.addEventListener('click', () => {
    const post = textArea.value;
    savePost(post);
    console.log(savePost);
  });

  generalFeed.append(sectionHeader, textAreaSection);
  sectionHeader.append(sectionLogo, buttonLogout);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  return generalFeed;
}

export default feed;
