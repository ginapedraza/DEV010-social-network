import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
  sendEmailVerification, signInWithEmailAndPassword,
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
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// Instrucciones para construir el vínculo al correo electrónico
// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   url: 'https://social-network-f3bfb.firebaseapp.com',
//   // This must be true.
//   handleCodeInApp: true,
//   iOS: {
//     bundleId: 'com.example.ios',
//   },
//   android: {
//     packageName: 'com.example.android',
//     installApp: true,
//     minimumVersion: '12',
//   },
//   /*dynamicLinkDomain: 'example.page.link',*/
// };
const auth = getAuth();

// Función que envia link al correo electrónico
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        console.log('enviadooooo');
      });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    console.log(userCredential.user.emailVerified);
    if (userCredential.user.emailVerified === true) {
      console.log('bienvenido al muro');
    } else {
      console.log('Aun no verifcas tu email');
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
