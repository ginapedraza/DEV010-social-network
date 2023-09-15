// eslint-disable-next-line import/no-extraneous-dependencies
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import home from '../src/components/home';
import * as lib from '../src/lib';
import * as authenticator from '../src/firebase.js';

// eslint-disable-next-line no-import-assign
jest.mock('@firebase/auth');

jest.mock('../src/lib', () => (
  {
    loginWithGoogle: jest.fn(),
    auth: jest.fn(),
  }
));
// eslint-disable-next-line no-import-assign
authenticator.auth = {
  currentUser: {
    displayName: 'Nicole',
  },
};
describe('Testing home function', () => {
  it('complete function with user ok', async () => {
    spyOn(lib, 'loginWithGoogle').mockImplementation(() => Promise.resolve());
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = { displayName: 'NombreUsuario' };
      callback(user); // Usuario autenticado
    });
    const navigateTo = jest.fn();
    const homeElement = home(navigateTo);
    const emailButton = homeElement.querySelector('.loginButton');
    const registerButton = homeElement.querySelector('.registerButton');
    const googleButton = homeElement.querySelector('.googleButton');
    emailButton.click();
    registerButton.click();
    googleButton.click();
    expect(googleButton).toBeTruthy();
    expect(navigateTo).toHaveBeenCalledWith('/login');
    expect(navigateTo).toHaveBeenCalledWith('/register');
    setTimeout(() => {
      expect(lib.loginWithGoogle).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }, 100);
  }, 5000);

  it('complete function with user null', async () => {
    spyOn(lib, 'loginWithGoogle').mockImplementation(() => Promise.resolve());
    firebase.onAuthStateChanged.mockImplementation((auth, callback) => {
      // eslint-disable-next-line no-param-reassign
      const user = null;
      callback(user); // Usuario autenticado
    });
    const navigateTo = jest.fn();
    const homeElement = home(navigateTo);
    const emailButton = homeElement.querySelector('.loginButton');
    const registerButton = homeElement.querySelector('.registerButton');
    const googleButton = homeElement.querySelector('.googleButton');
    emailButton.click();
    registerButton.click();
    googleButton.click();
    expect(googleButton).toBeTruthy();
    expect(navigateTo).toHaveBeenCalledWith('/login');
    expect(navigateTo).toHaveBeenCalledWith('/register');
    setTimeout(() => {
      expect(lib.loginWithGoogle).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }, 100);
  }, 5000);
});
