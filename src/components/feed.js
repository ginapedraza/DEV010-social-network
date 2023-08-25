// import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js'; // aca se importa tambien db más adelante
import { addPost, showPosts } from '../lib/index.js';

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

  // Sección para mostrar los posts
  // const postsSection = document.createElement('section');
  // postsSection.classList.add('posts-section');
  // const individualPost = document.createElement('article');
  // individualPost.classList.add('individual-post');
  // const postNameUser = document.createElement('h4');
  // postNameUser.textContent = doc.data().email;

  sendPostButton.addEventListener('click', () => {
    const post = textArea.value;
    const email = auth.currentUser.email;
    if (post !== '') {
      addPost(email, post).then(() => {
        showPosts();
        const getPostSection = document.getElementById('post-section');
        generalFeed.append(getPostSection);
        textArea.value = '';
      });
    } else {
      alert('Please write something');
    }
  });

  generalFeed.append(sectionHeader, textAreaSection);
  sectionHeader.append(sectionLogo, buttonLogout);
  sectionLogo.append(imageLogo);
  textAreaSection.append(textArea, sendPostButton);
  return generalFeed;
}

export default feed;
