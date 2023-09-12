/* eslint-disable max-len */
// import { sendEmailVerification } from 'firebase/auth';
// import { verifyEmail } from '../src/firebase.js';
// import { verifyEmail, createUser } from '../src/firebase.js';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import register from '../src/components/register.js';
import { createUser } from '../src/lib/index.js';

/* const objectAuth = {
  currentUser: '',
}; */

jest.mock('../src/lib/index.js', () => (
  {
    createUser: jest.fn(),
    // => Promise.resolve({ response: { test: 'test' } })),
    auth: jest.fn(), // => objectAuth),
    // createUserWithEmailAndPassword: jest.fn(),

  }
));

describe('Testing register function', () => {
  const navigateTo = jest.fn();
  const registerElement = register(navigateTo);

  const sendEmailButton = registerElement.querySelector('.sendEmail');
  const inputEmail = registerElement.querySelector('#inputEmail');
  const inputPass = registerElement.querySelector('#inputPass');
  const inputConfirmPass = registerElement.querySelector('#inputConfirmPass');
  const inputName = registerElement.querySelector('#inputUser');
  const buttonReturn = registerElement.querySelector('.button-return');

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(registerElement);
  });
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(registerElement);
  });

  it('should navigate to Home when clicking button return', async () => {
    buttonReturn.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/');
  }, 0);

  it('should register a new user with email and password', async () => {
    inputEmail.value = 'test@email.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';

    sendEmailButton.click();
    await Promise.resolve();
    expect(createUser).toHaveBeenCalledWith('test@email.com', '123456');
  });

  it('should show an error message if passwords do not match', async () => {
    createUser.mockRejectedValue(inputPass.value !== inputConfirmPass.value);
    const errorAlert = registerElement.querySelector('.error');
    // messageAlert.textContent = 'Las contraseñas no coinciden. Intenta nuevamente';
    inputPass.value = '123456';
    inputConfirmPass.value = '123556';

    sendEmailButton.click();
    await Promise.resolve();
    expect(errorAlert.textContent).toBe('Las contraseñas no coinciden. Intenta nuevamente');
  });
  it('should display an error message when registration fails due to existing user', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue({ code: 'auth/email-already-in-use' }); // No parece estar evaluando esta línea

    inputEmail.value = 'ginapedraza00@gmail.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    inputName.value = 'Gina';
    sendEmailButton.click();
    process.nextTick(() => {
      const errorAlert = registerElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('El correo proporcionado ya esta en uso.');
      done();
    });
  });
  it('should display an error message when password length < 6 characters', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputPass.value.length < 6); // No parece estar evaluando esta línea

    // messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    inputName.value = 'Gina';
    inputEmail.value = 'test123@gmail.com';
    inputPass.value = '1234';
    inputConfirmPass.value = '1234';
    sendEmailButton.click();
    process.nextTick(() => {
      const errorAlert = registerElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('La contraseña debe tener al menos 6 caracteres.');
      done();
    });
  });
  it('should show pass when click passButton once', async () => {
    const passButton = registerElement.querySelector('.pass-button');
    passButton.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(inputPass.type).toBe('text');
  }, 0);
  /*  it.only('should no show pass when click passButton once', async () => {
    const passButton = registerElement.querySelector('.pass-button');
    passButton.click();
    expect(inputPass.type).toBe('password');
  }, 0); */
  it('should show confirm pass when click confirmPassButton once', async () => {
    const confirmPassButton = registerElement.querySelector('.confirmpass-button');
    confirmPassButton.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(inputConfirmPass.type).toBe('password');
  }, 0);

  it('should display an error message when no user', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputName.value.length === 0); // No parece estar evaluando esta línea

    // messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    inputName.value = '';
    inputEmail.value = 'test123@gmail.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    sendEmailButton.click();
    process.nextTick(() => {
      const errorAlert = registerElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Debes ingresar un nombre de usuario');
      done();
    });
  });
  it('should display an error message when no email', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputEmail.value.length === 0); // No parece estar evaluando esta línea

    // messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    inputName.value = 'Gina';
    inputEmail.value = '';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    sendEmailButton.click();
    process.nextTick(() => {
      const errorAlert = registerElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Debes ingresar tu email.');
      done();
    });
  });
  // Este falla pero cubre
  it('should no display an error message when no email', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputEmail.value.length !== 0);
    // messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    inputName.value = 'Gina';
    inputEmail.value = 'test123@gmail.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    sendEmailButton.click();
    process.nextTick(() => {
      const errorAlert = registerElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('');
      done();
    });
  });
});
