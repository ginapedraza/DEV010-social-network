// import { sendEmailVerification } from 'firebase/auth';
import * as auth from '../src/firebase.js';
// import { verifyEmail, createUser } from '../src/firebase.js';
import register from '../src/components/register.js';

const objectAuth = {
  currentUser: '',
};

jest.mock('../src/firebase.js', () => (
  {
    verifyEmail: jest.fn(() => Promise.resolve()),
    createUser: jest.fn(() => Promise.resolve()),
    auth: jest.fn(() => objectAuth),
  }
));

describe('Testing register function', () => {
  test('it should call function createUser and create a new user', () => {
    // jest.spyOn(auth, 'createUser').mockImplementation(() => Promise.resolve({
    // currentUser: true, data: { code: 'mockData' } }));
    // jest.spyOn(auth, 'verifyEmail').mockImplementation(() => Promise.resolve());

    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(register(navigateTo));
    const sendEmailButton = DOM.querySelector('.sendEmail');

    DOM.querySelector('#inputEmail').value = 'test@email.com';
    DOM.querySelector('#inputPass').value = '123456';

    sendEmailButton.click();
    expect(auth.verifyEmail).toHaveBeenCalledTimes(1);
  });
});
