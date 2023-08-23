// importamos la funcion que vamos a testear
// import { sendEmailVerification } from 'firebase/auth';
import * as auth from '../src/firebase.js';
import login from '../src/components/login.js';

describe('Testing Login function', () => {
  beforeEach(() => {
    // Restaurar la implementación original de auth.signIn antes de cada test
    jest.restoreAllMocks();
  });
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

  test('it should show an error when signIn return emailVerified=false with code auth/user-not-found', () => {
    jest.spyOn(auth, 'signIn').mockImplementation(() => Promise.resolve({ emailVerified: false, data: { code: 'auth/user-not-found' } }));
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(login(navigateTo));
    const buttonLogin = DOM.querySelector('.login-button');
    DOM.querySelector('#inputEmail').value = 'test@email.com';
    DOM.querySelector('#inputPass').value = '123456';
    const error1 = DOM.querySelector('.error');
    buttonLogin.click();
    expect(auth.signIn).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledTimes(0);
      expect(error1.innerText).toBe('Usuario no encontrado. Verifica tus credenciales.');
    }, 0);
  });
});
