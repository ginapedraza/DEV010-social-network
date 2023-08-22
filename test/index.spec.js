// importamos la funcion que vamos a testear
import { createUser } from '../src/firebase.js';

/* describe('Testing register function', () => {
  test('it should create a new user'), async () => {
    jest.spyOn(auth, 'createUser').mockImplementation(() => Promise.resolve({ loginOk: true, data: { code: 'mockData' } }));

    const DOM = document.createElement('div');
    DOM.append(register(navigateTo));
    const registerBtn = DOM.querySelector('#registerBtn');

    DOM.querySelector('#userEmail').value = 'test@test.com';
    DOM.querySelector('#password').value = 'abc8561';

    registerBtn.click();
    expect(auth.createUser).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/home');
    }, 0);
  }
}); */
