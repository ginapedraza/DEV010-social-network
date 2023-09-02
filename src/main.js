// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js'; */
import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';
import feed from './components/feed.js';
import noFeed from './components/noFeed.js';
import resetPassword from './components/resetPassword.js';
import mailVerificacion from './components/mailVerification.js';
import profile from './components/profile.js';

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/error', component: error },
  { path: '/register', component: register },
  { path: '/feed', component: feed },
  { path: '/noFeed', component: noFeed },
  { path: '/resetPassword', component: resetPassword },
  { path: '/mailVerification', component: mailVerificacion },
  { path: '/profile', component: profile },
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

/* myFunction(); */
