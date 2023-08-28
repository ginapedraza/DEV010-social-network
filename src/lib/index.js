import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase.js';
// Función que inicia sesión con google
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  // const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

// Función que crea el usuario con correo y contraseña
const createUser = (email, user, password) => createUserWithEmailAndPassword(auth, email, password);

// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para crear un post
const addPost = async (user, post) => {
  const postsCollection = collection(db, 'posts');
  await addDoc(postsCollection, {
    user,
    post,
  });
};

// Función para mostrar los posts
const showPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => {
    const getPostSection = document.getElementById('post-section');
    const individualPost = document.createElement('article');
    individualPost.setAttribute('id', 'individual-post');
    individualPost.classList.add('individual-post');
    const post = doc.data();
    const postNameUser = document.createElement('h4');
    const postContent = document.createElement('p');
    postNameUser.textContent = post.email;
    postContent.textContent = post.post;
    // const getLikeSection = document.querySelector('.section-like');

    getPostSection.append(individualPost);
    individualPost.append(postNameUser, postContent);
  });
};

export {
  loginWithGoogle, createUser, signIn, addPost, showPosts,
};
