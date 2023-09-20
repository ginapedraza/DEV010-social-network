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
  // path indica la URL de la ruta
  // component representa el componente asociado a esa ruta.
  // se indica por ejemplo que cuando la URL sea '/' se mostrará el componente home.
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
// root obtiene el elemento del documento con el id 'root'
// que se utiliza para mostrar los componentes en la interfaz de usuario.
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  // Si existe una ruta y un componente asociado a esa ruta
  if (route && route.component) {
    // Se utiliza el método pushState() del objeto window.history para cambiar la URL en la barra
    // de direcciones del navegador sin recargar la página.
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    // Se verifica si hay un primer hijo en el elemento root y, de ser así, se elimina.
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    // Se agrega el componente asociado a la ruta al elemento root
    root.appendChild(route.component(navigateTo));
  } else {
    // Si no existe una ruta o un componente asociado, se navega a '/error'.
    navigateTo('/error');
  }
}
// El código establece un evento cuando el usuario retrocede en la navegación del navegador.
// Cuando esto sucede, se llama a navigateTo pasando como argumento la ruta actual de la página
// Esto permite mantener la coherencia entre la URL y el contenido mostrado en la página.
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};
// El código llama a la función navigateTo pasando como argumento la ruta actual de la página
// o, en caso de que no exista, la ruta por defecto (defaultRoute).
// Esto permite establecer la ruta inicial cuando se carga la pág o no se encuentra una ruta válida.
navigateTo(window.location.pathname || defaultRoute);
