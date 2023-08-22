// importamos la funcion que vamos a testear
import { sendEmailVerification } from 'firebase/auth';
import * as auth from '../src/firebase.js';
import login from '../src/components/login.js';
import register from '../src/components/register.js';

describe('Testing Login function', () => {
  test('it should call signIn and redirect to feed when emailVerified is true', () => {
    jest.spyOn(auth, 'signIn').mockImplementation(() => Promise.resolve({ emailVerified: true, data: { code: 'mockData' } }));

    const DOM = document.createElement('div');
    const navigateTo = jest.fn(); // Agregar la función navigateTo simulada
    DOM.append(login(navigateTo));
    const buttonLogin = DOM.querySelector('.login-button');

    DOM.querySelector('#inputEmail').value = 'test@email.com';
    DOM.querySelector('#inputPass').value = '123456';

    buttonLogin.click();
    expect(auth.signIn).toHaveBeenCalledTimes(1);
    expect(auth.signIn).toHaveBeenCalledWith('test@email.com', '123456');
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    }, 0);
  });
});

describe('Testing register function', () => {
  test('it should call function createUser and create a new user', () => {
    jest.spyOn(auth, 'createUser').mockImplementation(() => Promise.resolve({ currentUser: true, data: { code: 'mockData' } }));

    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(register(navigateTo));
    const sendEmailButton = DOM.querySelector('.sendEmail');

    DOM.querySelector('#inputEmail').value = 'test@email.com';
    DOM.querySelector('#inputPass').value = '123456';

    sendEmailButton.click();
    expect(auth.createUser).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(sendEmailVerification).toHaveBeenCalledTimes(1);
    }, 0);
  });
});
