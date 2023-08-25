import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
// Función que inicia sesión con google
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  // const auth = getAuth(app);
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

const savePost = (post) => {
  try {
    const docRef = getDocs(collection(db, 'posts'), {
      userPost: post,

    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export {
  loginWithGoogle, createUser, signIn, savePost,
};
