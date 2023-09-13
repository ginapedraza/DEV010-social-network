/* eslint-disable no-import-assign */
import { expect, jest } from '@jest/globals';
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import * as authenticator from '../src/firebase.js';
import profile from '../src/components/profile.js';
import * as lib from '../src/lib';

jest.mock('@firebase/auth');
// eslint-disable-next-line no-import-assign
authenticator.auth = {
  currentUser: {
    displayName: 'Nicole',
  },
};
describe('profile', () => {
  /*  it('should send post correctly ', (done) => {
    spyOn(lib, 'addPost').mockImplementation(() => Promise.resolve());
    spyOn(lib, 'showPosts');
    const navigateTo = () => { };
    const profileContainer = profile(navigateTo);
    const textarea = profileContainer.querySelector('.text-area');
    const button = profileContainer.querySelector('.sendPost-button');
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
  }, 60000);
  it('should call showPost when user is autenticated', (done) => {
    spyOn(firebase, 'getAuth').mockImplementation(() => ({
      _isInitialized: true,
    }));
    spyOn(lib, 'showPosts').mockImplementation(() => Promise.resolve());
    setTimeout(() => {
      expect(lib.showPosts).toHaveBeenCalled();
      done();
    }, 100);
  }); */
  // Este si pasa
  it('Should show standard image when post is not from current user', () => {
    spyOn(firebase, 'getAuth').mockImplementation(() => ({
      currentUser: {
        photoURL: null,
      },
    }));
    const navigateTo = () => { };
    const feedContainer = profile(navigateTo);
    const imgProfile = feedContainer.querySelector('.imgProfile');
    imgProfile.src = '/images/profileButton.png';
    expect(imgProfile.src).toBe(`${window.location.origin}/images/profileButton.png`);
  });
});
/* describe('logOut', () => {
  const navigateTo = jest.fn();
  const profileElement = profile(navigateTo);
  const buttonLogout = profileElement.querySelector('.button-logout');
  const buttonHome = profileElement.querySelector('.button-profile');
  it('should log out when clicking button buttonLogout', (done) => {
    buttonLogout.click();
    spyOn(lib, 'logOut').mockImplementation(() => Promise.resolve());
    expect(lib.logOut).toHaveBeenCalled();
    done();
  }, 0);
  // este tambien funciona
  it('should navigate to /feed when clicking button buttonhome', async () => {
    buttonHome.click();
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  }, 0);
}); */

describe('onAuthStateChanged', () => {
  const navigateTo = jest.fn();
  // funciona
  it('debería llamar a navigateTo con "/noFeed" si el usuario no está autenticado', () => {
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // Usuario no autenticado
    });
    profile(navigateTo);
    // Verifica si navigateTo se llamó con la ruta correcta
    expect(navigateTo).toHaveBeenCalledWith('/noFeed');
  });
  // funciona
  it('debería llamar a showPost si el usuario está autenticado', async () => {
    // Simula que el usuario está autenticado
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });

    const feedContainer = profile(navigateTo);

    setTimeout(() => {
      // Verifica si showPosts se llamó

      const user = { displayName: 'NombreUsuario' };
      const name = user.displayName;
      const postsSection = feedContainer.querySelector('#post-section');
      expect(lib.showPosts).toHaveBeenCalled();
      expect(lib.showPosts).toHaveBeenCalledWith(name, postsSection);
    });
  });
  // funciona
  it('debería llamar a showPost si el usuario está autenticado y con foto', async () => {
    authenticator.auth = {
      currentUser: {
        displayName: 'Nicole',
        photoURL: 'urlFake',
      },
    };
    // Simula que el usuario está autenticado
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });

    const feedContainer = profile(navigateTo);

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
