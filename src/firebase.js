/* eslint-disable no-alert */
import { initializeApp } from 'firebase/app';
import {
  // eslint-disable-next-line max-len
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
} from 'firebase/auth';
// import { firebase } from 'firebase/firestore';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
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
// Función que inicia sesión con google
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
      result)
    .catch((error) => {
      throw error;
    });
};

// Guardamos en auth la función de firebase getAuth para la autenticación
const auth = getAuth();
// Función que crea el usuario con correo y contraseña
const createUser = (email, password) => {
  const UserCredential = createUserWithEmailAndPassword(auth, email, password);
  return UserCredential.user;
};
// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
//  Función que envía email con link de verificación
const verifyEmail = (user) => sendEmailVerification(user);

// Probando crear colecciones para almacenar datos en firestore
// Initialize Cloud Firestore and get a reference to the service

// const db = getFirestore(app);

/* function guardarCorreo(valCorreo) {
  return db.collection('correos').add({
    correo: valCorreo,
  });
} */
/* const db = getFirestore(app);

const savePost = (post) => {
  try {
    const docRef = addDoc(collection(db, 'posts'), {
      userPost: post,

    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}; */

/* const saveUser = (email) => {
  db.collection('emails').add({
    emailUser: email,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}; */

/* const saveUser = async (email) => {
  try {
    // Obtiene una referencia a la colección 'emails'
    const emailsCollection = collection(db, 'emails');
    // Agrega el documento con el correo electrónico
    await addDoc(emailsCollection, { emailUser: email });
    console.log('Email saved successfully.');
  } catch (error) {
    console.error('Error adding email: ', error);
  }
}; */

export {
  loginWithGoogle, createUser, signIn, verifyEmail, auth,
};
