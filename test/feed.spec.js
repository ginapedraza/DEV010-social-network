/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-import-assign */
import { expect, jest } from '@jest/globals';
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import * as authenticator from '../src/firebase.js';
import feed from '../src/components/feed';
import * as lib from '../src/lib';

jest.mock('@firebase/auth');
// eslint-disable-next-line no-import-assign
authenticator.auth = {
  currentUser: {
    displayName: 'Nicole',
  },
};
describe('feed', () => {
  it('should send a post correctly ', (done) => {
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
  });
});
describe('logOut', () => {
  const navigateTo = jest.fn();
  const feedElement = feed(navigateTo);
  const buttonProfile = feedElement.querySelector('.button-profile');
  it('should navigate to /profile when clicking buttonProfile', async () => {
    buttonProfile.click();
    expect(navigateTo).toHaveBeenCalledWith('/profile');
  }, 0);
});

describe('onAuthStateChanged', () => {
  const navigateTo = jest.fn();
  it('should call navigateTo with "/noFeed" if user is not authenticated', () => {
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // Usuario no autenticado
    });
    feed(navigateTo);
    // Verifica si navigateTo se llamó con la ruta correcta
    expect(navigateTo).toHaveBeenCalledWith('/noFeed');
  });
  it('should call showPost if user is authenticated', async () => {
    // Simula que el usuario está autenticado
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
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
  it('should call showPost if user is authenticated and has a profile photo', async () => {
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
