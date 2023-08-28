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
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
//  Función que envía email con link de verificación
// const verifyEmail = (user) => sendEmailVerification(user);

// Probando crear colecciones para almacenar datos en firestore
// Initialize Cloud Firestore and get a reference to the service

// const db = getFirestore(app);

/* function guardarCorreo(valCorreo) {
  return db.collection('correos').add({
    correo: valCorreo,
  });
} */

// Función para crear un post
const addPost = async (email, post) => {
  const postsCollection = collection(db, 'posts');
  await addDoc(postsCollection, {
    email,
    post,
  });
};
// Función para mostrar los posts
const showPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));

  // individualPost.classList.add('individual-post');
  // const posts = setUpPosts(querySnapshot.docs);
  querySnapshot.forEach((doc) => {
    const getPostSection = document.getElementById('post-section');
    const getIndividualPost = document.getElementById('individual-post');
    const post = doc.data();
    const postNameUser = document.createElement('h4');
    const postContent = document.createElement('p');
    postNameUser.textContent = post.email;
    postContent.textContent = post.post;

    getPostSection.append(getIndividualPost);
    getIndividualPost.append(postNameUser, postContent);
  });
};

/* const showPosts = async (data) => {
  const postsQuery = query(collection(db, 'posts'));
  const postsSnapshot = await getDocs(postsQuery);
  postsSnapshot.forEach((doc) => {
    const post = doc.data();
    console.log(post);
    const userPost = document.createElement('article');
    userPost.classList.add('user-post');
  });
}; */

export {
  loginWithGoogle, createUser, signIn, addPost, showPosts,
};
