/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

// Este es el punto de entrada de tu aplicacion
import { initializeApp } from 'firebase/app';
import { myFunction } from './lib/index.js';
import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';

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
const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/register', component: register },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);

myFunction();