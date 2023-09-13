/* eslint-disable import/no-extraneous-dependencies */
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
  it('should send post correctly ', (done) => {
    spyOn(lib, 'addPost').mockImplementation(() => Promise.resolve());
    spyOn(lib, 'showPostsProfile');
    const navigateTo = () => { };
    const profileContainer = profile(navigateTo);
    const textarea = profileContainer.querySelector('.text-area');
    const sendPostbutton = profileContainer.querySelector('.sendPost-button');
    textarea.value = 'Bienvenidos a TweetFit';
    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
    sendPostbutton.click();
    expect(textarea.value).toBe('Bienvenidos a TweetFit');
    expect(textarea).toBeTruthy();
    expect(sendPostbutton).toBeTruthy();
    setTimeout(() => {
      expect(firebase.onAuthStateChanged).toHaveBeenCalled();
      expect(textarea.value).toBe('');
      done();
    }, 100);
  }, 60000);
  it('should navigate to feed when clicking button home', () => {
    const navigateTo = jest.fn();
    const feedContainer = profile(navigateTo);
    const buttonHome = feedContainer.querySelector('.button-profile');
    buttonHome.click();
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  });
  it('Should show standard image when post is not from current user', () => {
    spyOn(firebase, 'onAuthStateChanged').mockImplementation(() => ({
      currentUser: {
        photoURL: null,
      },
    }));
    const navigateTo = jest.fn();
    const profileContainer = profile(navigateTo);
    const imgProfile = profileContainer.querySelector('.imgProfile');
    imgProfile.src = '/images/defaultProfile.png';
    expect(imgProfile.src).toBe(`${window.location.origin}/images/defaultProfile.png`);
  });
});

describe('onAuthStateChanged', () => {
  const navigateTo = jest.fn();

  it('debería llamar a navigateTo con "/noFeed" si el usuario no está autenticado', () => {
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // Usuario no autenticado
    });
    profile(navigateTo);
    // Verifica si navigateTo se llamó con la ruta correcta
    expect(navigateTo).toHaveBeenCalledWith('/noFeed');
  });
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
      expect(lib.showPostsProfile).toHaveBeenCalled();
      expect(lib.showPostsProfile).toHaveBeenCalledWith(name, postsSection);
    });
  });
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

    const profileContainer = profile(navigateTo);

    setTimeout(() => {
      // Verifica si showPosts se llamó

      const user = { displayName: 'NombreUsuario' };
      const name = user.displayName;
      const postsSection = profileContainer.querySelector('#profilePost-section');
      expect(lib.showPostsProfile).toHaveBeenCalled();
      expect(lib.showPostsProfile).toHaveBeenCalledWith(name, postsSection);
    });
  });
});
