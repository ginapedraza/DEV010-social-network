/* eslint-disable no-alert */
import { initializeApp } from 'firebase/app';
import {
  // eslint-disable-next-line max-len
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
} from 'firebase/auth';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUtyyJeNqJZJnKy227Bdyp7l65-K07C4o',
  authDomain: 'social-network-f3bfb.firebaseapp.com',
  projectId: 'social-network-f3bfb',
  storageBucket: 'social-network-f3bfb.appspot.com',
  messagingSenderId: '80088957819',
  appId: '1:80088957819:web:733c0e10cdc09d284e73de',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) =>
      // This gives you a Google Access Token. You can use it to access the Google API.
      // permite extraer las credenciales de Google de un objeto UserCredential
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      // eslint-disable-next-line implicit-arrow-linebreak
      result).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      throw error;
    });
};

const auth = getAuth();
// Función que envia link al correo electrónico para crear usuario
// eslint-disable-next-line max-len
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

const verifyEmail = (user) => sendEmailVerification(user);

export {
  loginWithGoogle, createUser, signIn, verifyEmail, auth,
};
