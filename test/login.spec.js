/* eslint-disable max-len */
import login from '../src/components/login.js';
import { signIn } from '../src/lib/index.js';
// import auth from '../src/firebase.js';

jest.mock('../src/lib/index.js', () => (
  {
    signIn: jest.fn(),
    // => Promise.resolve({ response: { test: 'test' } })),
    auth: jest.fn(), // => objectAuth),
    // createUserWithEmailAndPassword: jest.fn(),

  }
));

describe('Testing Login function', () => {
  const navigateTo = jest.fn();
  // const userCredential = jest.fn();
  const loginElement = login(navigateTo);

  const buttonLogin = loginElement.querySelector('.login-button');
  const inputEmail = loginElement.querySelector('#inputEmail');
  const inputPass = loginElement.querySelector('#inputPass');
  const buttonReturn = loginElement.querySelector('.button-return');
  const restorePass = loginElement.querySelector('.restorePassP');

  it('should register a new user with email and password', async () => {
    inputEmail.value = 'test@email.com';
    inputPass.value = '123456';

    buttonLogin.click();
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith('test@email.com', '123456');
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }, 0);
  });

  it('should navigate to Home when clicking button return', async () => {
    buttonReturn.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/');
  }, 0);

  it('should navigate to resetPaswword when clicking button restorePass', async () => {
    restorePass.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/resetPassword');
  }, 0);

  it('Debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });

  /* it('should show an error message when email is not verified', async () => {
    signIn.mockRejectedValue('auth/user-not-found'); // Como el test verifica este error.
    const errorAlert = loginElement.querySelector('.error');
    // errorAlert.textContent = 'Usuario no encontrado. Verifica tus credenciales.';
    // signIn.mockImplementation(() => Promise.resolve(errorAlert));

    buttonLogin.click();
    await Promise.resolve();
    expect(errorAlert.textContent).toBe('Usuario no encontrado. Verifica tus credenciales.');
  }); */
});
