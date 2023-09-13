// import { spyOn } from 'jest-mock';
// import * as firebase from 'firebase/auth';
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import home from '../src/components/home';
import * as lib from '../src/lib';
import * as authenticator from '../src/firebase.js';
// import * as authenticator from '../src/firebase.js';
// import * as yes from '../src/lib';

/* jest.mock('@firebase/auth');
// eslint-disable-next-line no-import-assign
authenticator.auth = {
  currentUser: {
    displayName: 'Nicole',
  },
}; */
jest.mock('../src/lib', () => (
  {
    loginWithGoogle: jest.fn(),
    // => Promise.resolve({ response: { test: 'test' } })),
    auth: jest.fn(), // => objectAuth),
    // createUserWithEmailAndPassword: jest.fn(),

  }
));
describe('Testing home function', () => {
  const navigateTo = jest.fn();
  // const userCredential = jest.fn();
  const homeElement = home(navigateTo);

  const emailButton = homeElement.querySelector('.loginButton');
  const registerButton = homeElement.querySelector('.registerButton');
  const googleButton = homeElement.querySelector('.googleButton');
  /* const inputEmail = homeElement.querySelector('#inputEmail');
  const inputPass = homeElement.querySelector('#inputPass');
  const restorePass = homeElement.querySelector('.restorePassP'); */

  it('should navigate to login', async () => {
    emailButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  }, 0);
  it('should navigate to register', async () => {
    registerButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  }, 0);
  /*   it.only('should call login with google', async () => {
      googleButton.click();
      expect(loginWithGoogle).toHaveBeenCalled();
    }, 0); */
  it('should call login with google', (done) => {
    spyOn(lib, 'loginWithGoogle').mockImplementation(() => Promise.resolve());
    // const navigateTo = () => { };
    // const feedContainer = feed(navigateTo);
    googleButton.click();
    /*    expect(textarea.value).toBe('Bienvenidos a TweetFit');
    expect(textarea).toBeTruthy(); */
    expect(googleButton).toBeTruthy();
    setTimeout(() => {
      expect(lib.loginWithGoogle).toHaveBeenCalled();
      // expect(lib.showPosts).toHaveBeenCalled();
      // expect(firebase.onAuthStateChanged).toHaveBeenCalled();
      // expect(textarea.value).toBe('');
      done();
    }, 100);
  }, 60000);
  /*   it('should navigate to feed', async () => {
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    });
  }); */
  /*   it.only('debería llamar a navigateTo con "/noFeed"
   si el usuario no está autenticado', () => {
      firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
        const user = { displayName: 'NombreUsuario' };
        callback(user); // Usuario no autenticado
      });
      home(navigateTo);
      // Verifica si navigateTo se llamó con la ruta correcta
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }); */
/*   it('debería navegar a feed si el usuario está autenticado y con foto', async () => {
    // eslint-disable-next-line no-import-assign
    authenticator.auth = {
      currentUser: {
        displayName: 'Nicole',
      },
    };
    // Simula que el usuario está autenticado
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });

    expect(navigateTo).toHaveBeenCalled();
    // expect(lib.showPosts).toHaveBeenCalledWith(name, postsSection);
  }); */
});
