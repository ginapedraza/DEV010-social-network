/* eslint-disable max-len */
// import { spyOn } from 'jest-mock';
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

  it('should login a user with email and password', async () => {
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

  it('should show an error message when email is not verified', (done) => {
    signIn.mockRejectedValue({ code: 'auth/user-not-found' }); // Como el test verifica este error.
    inputEmail.value = 'test@email.com';
    inputPass.value = '123456';
    buttonLogin.click();
    process.nextTick(() => {
      const errorAlert = loginElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Usuario no encontrado. Verifica tus credenciales.');
      done();
    });
  });
  it('should show an error message when password is incorrect', (done) => {
    signIn.mockRejectedValue({ code: 'auth/wrong-password' }); // Como el test verifica este error.
    inputEmail.value = 'juanpabloviloria@gmail.com';
    inputPass.value = '123455';
    buttonLogin.click();
    process.nextTick(() => {
      const errorAlert = loginElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Contraseña incorrecta. Verifica tus datos.');
      done();
    });
  });
  it('should show an error message when user is disabled', (done) => {
    signIn.mockRejectedValue({ code: 'auth/user-disabled' }); // Como el test verifica este error.
    inputEmail.value = 'n_rogget@yahoo.es';
    inputPass.value = '123456';
    buttonLogin.click();
    process.nextTick(() => {
      const errorAlert = loginElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Tu cuenta ha sido deshabilitada.');
      done();
    });
  });
  it('should show pass when click passButton once', async () => {
    const passButton = loginElement.querySelector('.pass-button');
    passButton.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(inputPass.type).toBe('text');
  }, 0);
  /*   it.only('should navigate to feed if user is verified', async () => {
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }, 0); */
  it('should navigate to feed if user is verified', (done) => {
    inputEmail.value = 'nicole.rogget@gmail.com';
    inputPass.value = '123456';
    buttonLogin.click();
    expect(navigateTo).toHaveBeenCalledWith('/feed');
    done();
  });
/*   it.only('debería llamar navegar a feed si el usuario está autenticado', () => {
    inputEmail.value = 'test@email.com';
    inputPass.value = '123456';
    const getEmail = inputEmail.value;
    const getPass = inputPass.value;
    const userCredential = signIn(getEmail, getPass);
    buttonLogin.click();
    expect(userCredential).toBe(true);
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  }); */
});
