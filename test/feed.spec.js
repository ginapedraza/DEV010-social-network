import { expect, jest } from '@jest/globals';
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import { auth } from '../src/firebase.js';
import feed from '../src/components/feed';
import * as lib from '../src/lib';

jest.mock('@firebase/auth');
jest.doMock('../src/firebase.js', () => ({
  ...(jest.requireActual('../src/firebase.js')),
  auth: jest.fn(),
}));

describe('feed', () => {
  it('should send post correctly ', (done) => {
/*     spyOn(auth, 'getAuth').mockImplementation(() => ({
      currentUser: {
        displayName: 'Nicole',
      },
    })); */
    spyOn(lib, 'addPost').mockImplementation(() => Promise.resolve());
    spyOn(lib, 'showPosts');
    const navigateTo = () => { };
    const feedContainer = feed(navigateTo);
    const textarea = feedContainer.querySelector('.text-area');
    const button = feedContainer.querySelector('.sendPost-button');
    textarea.value = 'Bienvenidos a TweetFit';
    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
    button.click();
    expect(textarea.value).toBe('Bienvenidos a TweetFit');
    expect(textarea).toBeTruthy();
    expect(button).toBeTruthy();
    setTimeout(() => {
      expect(lib.addPost).toHaveBeenCalled();
      expect(lib.showPosts).toHaveBeenCalled();
      expect(firebase.onAuthStateChanged).toHaveBeenCalled();
      expect(textarea.value).toBe('');
      done();
    }, 100);
  });
  /* it.only('should call showPost when user is autenticated', (done) => {
    spyOn(firebase, 'getAuth').mockImplementation(() => ({
      _isInitialized: true,
    }));
    spyOn(lib, 'showPosts').mockImplementation(() => Promise.resolve());
    const navigateTo = () => { };
    const feedContainer = feed(navigateTo);
    setTimeout(() => {
      expect(lib.showPosts).toHaveBeenCalled();
      done();
    }, 100);
  }); */
  /* it('Should show standard image when post is not from current user', () => {
    spyOn(firebase, 'getAuth').mockImplementation(() => ({
      currentUser: {
        photoURL: null,
      },
    }));
    const navigateTo = () => { };
    const feedContainer = feed(navigateTo);
    const imgProfile = feedContainer.querySelector('.img-profile');
    imgProfile.src = '/images/profileButton.png';
    expect(imgProfile.src).toBe(`${window.location.origin}/images/profileButton.png`);
  }); */
});
/* describe('logOut', () => {
  const navigateTo = jest.fn();
  const feedElement = feed(navigateTo);
  const buttonLogout = feedElement.querySelector('.button-logout');
  const buttonProfile = feedElement.querySelector('.button-profile');
  it('should log out when clicking button buttonLogout', async () => {
    buttonLogout.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(lib.logOut).toHaveBeenCalledTimes(1);
    // expect(navigateTo).toHaveBeenCalledWith('/');
  }, 0);
  it('should navigate to /profile when clicking button buttonProfile', async () => {
    buttonProfile.click();
    expect(navigateTo).toHaveBeenCalledWith('/profile');
  }, 0);
});
*/
describe('onAuthStateChanged', () => {
  const navigateTo = jest.fn();
  // const navigateTo = () => { };
  it('debería llamar a navigateTo con "/noFeed" si el usuario no está autenticado', () => {
    // Simula que el usuario no está autenticado

    /*     const mockAuth = jest.fn();
    const user = {
      currentUser: {
        displayName: 'Nicole',
      },
    }; */
    auth.mockReturnValue(true);

    firebase.onAuthStateChanged.mockImplementation((_isInitialized, callback) => {
      console.log(auth);
      callback(true); // Usuario no autenticado
    });

    // Llama a la función feed con navigateTo
    feed(navigateTo);

    // Verifica si navigateTo se llamó con la ruta correcta
    expect(navigateTo).toHaveBeenCalledWith('/noFeed');
  });
  it('debería llamar a showPost si el usuario está autenticado', async () => {
    // Simula que el usuario está autenticado
    firebase.onAuthStateChanged.mockImplementation((_, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });

    const feedContainer = feed(navigateTo);

    setTimeout(() => {
      // Verifica si showPosts se llamó

      const user = { displayName: 'NombreUsuario' };
      const name = user.displayName;
      const postsSection = feedContainer.querySelector('#post-section');
      expect(lib.showPosts).toHaveBeenCalled();
      expect(lib.showPosts).toHaveBeenCalledWith(name, postsSection);
    });
  });
});
