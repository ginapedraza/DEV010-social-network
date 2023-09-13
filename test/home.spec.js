// import { spyOn } from 'jest-mock';
import home from '../src/components/home';
// import * as yes from '../src/lib';

describe('Testing home function', () => {
  const navigateTo = jest.fn();
  // const userCredential = jest.fn();
  const homeElement = home(navigateTo);

  const emailButton = homeElement.querySelector('.loginButton');
  const registerButton = homeElement.querySelector('.registerButton');
  // const googleButton = homeElement.querySelector('.googleButton');
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
/*   it('should navigate to google', async () => {
    spyOn(yes, 'loginWithGoogle');
    await googleButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  }, 0); */
});
