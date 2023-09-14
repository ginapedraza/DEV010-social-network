import register from '../src/components/register.js';
import { createUser } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => (
  {
    createUser: jest.fn(),
    auth: jest.fn(),
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
    inputPass.value = '123456';
    inputConfirmPass.value = '123556';

    sendEmailButton.click();
    await Promise.resolve();
    expect(errorAlert.textContent).toBe('Las contraseñas no coinciden. Intenta nuevamente');
  });
  it('should display an error message when registration fails due to existing user', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue({ code: 'auth/email-already-in-use' });

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
    createUser.mockRejectedValue(inputPass.value.length < 6);
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
  it('should show pass when clicking passButton once', async () => {
    const passButton = registerElement.querySelector('.pass-button');
    passButton.click();
    expect(inputPass.type).toBe('text');
  }, 0);
  it('should no show pass when clicking passButton again', async () => {
    const passButton = registerElement.querySelector('.pass-button');
    passButton.click();
    expect(inputPass.type).toBe('password');
  }, 0);
  it('should show confirm pass when clicking confirmPassButton once', async () => {
    const confirmPassButton = registerElement.querySelector('.confirmpass-button');
    confirmPassButton.click();
    expect(inputConfirmPass.type).toBe('text');
  }, 0);
  it('should no show confirm pass when clicking confirmPassButton again', async () => {
    const confirmPassButton = registerElement.querySelector('.confirmpass-button');
    confirmPassButton.click();
    expect(inputConfirmPass.type).toBe('password');
  }, 0);

  it('should display an error message when user input is empty', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputName.value.length === 0);
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
  it('should display an error message when email input is empty', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputEmail.value.length === 0);
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
  it('shouldnt display an error message when email input is correctly filled', (done) => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputEmail.value.length >= 1);
    const errorAlert = registerElement.querySelector('.error');
    errorAlert.textContent = '';
    inputName.value = 'Gina';
    inputEmail.value = 'test123@gmail.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    sendEmailButton.click();
    process.nextTick(() => {
      expect(errorAlert.textContent).toBe('');
      done();
    });
  });
});
