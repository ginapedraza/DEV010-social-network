// eslint-disable-next-line import/no-extraneous-dependencies
import { spyOn } from 'jest-mock';
import * as firebase from 'firebase/auth';
import home from '../src/components/home';
import * as lib from '../src/lib';

// eslint-disable-next-line no-import-assign
jest.mock('../src/lib', () => (
  {
    loginWithGoogle: jest.fn(),
    auth: jest.fn(),
  }
));
describe('Testing home function', () => {
  const navigateTo = jest.fn();
  const homeElement = home(navigateTo);
  const emailButton = homeElement.querySelector('.loginButton');
  const registerButton = homeElement.querySelector('.registerButton');
  const googleButton = homeElement.querySelector('.googleButton');

  it('should navigate to login', async () => {
    emailButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  }, 0);
  it('should navigate to register', async () => {
    registerButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  }, 0);
  it('should call login with google', (done) => {
    spyOn(lib, 'loginWithGoogle').mockImplementation(() => Promise.resolve());
    googleButton.click();
    expect(googleButton).toBeTruthy();
    setTimeout(() => {
      expect(lib.loginWithGoogle).toHaveBeenCalled();
      done();
    }, 100);
  }, 60000);
  /*  it('should navigate to feed id user is autenticated', (done) => {
    spyOn(firebase, 'getAuth').mockImplementation(() => ({
      _isInitialized: true,
    }));
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/feed');
      done();
    }, 100);
  }); */
});
