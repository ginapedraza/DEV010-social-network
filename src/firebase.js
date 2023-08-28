/* eslint-disable no-alert */
import { initializeApp } from 'firebase/app';
import {
  // eslint-disable-next-line max-len
  getAuth,
} from 'firebase/auth';
// import { firebase } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
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
// Guardamos en auth la función de firebase getAuth para la autenticación
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth, db,
};
