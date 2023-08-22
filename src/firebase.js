/* eslint-disable no-alert */
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
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

export const loginWithGoogle = () => {
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

// Función que envia link al correo electrónico
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
/* .then(() => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        alert('Hemos enviado el link de verificación a tu correo.');
      });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      alert('La dirección de correo electrónico proporcionada ya esta en uso.');
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
    } else {
      alert(errorMessage);
    }

    // ..
  }); */

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
