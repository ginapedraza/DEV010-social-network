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
  // const inputUser = registerElement.querySelector('#inputUser');
  const inputPass = registerElement.querySelector('#inputPass');
  const inputConfirmPass = registerElement.querySelector('#inputConfirmPass');
  const inputName = registerElement.querySelector('.input-register');

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(registerElement);
  });

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
  it('should display an error message when registration fails due to existing user', async () => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue({ code: 'auth/email-already-in-use' }); // No parece estar evaluando esta línea
    const errorAlert = registerElement.querySelector('.error');
    // messageAlert.textContent = 'El proporcionado ya esta en uso.';
    inputEmail.value = 'ginapedraza00@gmail.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';
    sendEmailButton.click();
    await Promise.resolve();
    expect(errorAlert.textContent).toBe('El correo proporcionado ya esta en uso.');
  });
  it('should display an error message when password length < 6 characters', async () => {
    // eslint-disable-next-line max-len
    createUser.mockRejectedValue(inputPass.value.length < 6); // No parece estar evaluando esta línea
    const errorAlert = registerElement.querySelector('.error');
    // messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    inputName.value = 'Gina';
    inputEmail.value = 'ginapedraza00@gmail.com';
    inputPass.value = '123';
    inputConfirmPass.value = '123';
    sendEmailButton.click();
    await Promise.resolve();
    expect(errorAlert.textContent).toBe('La contraseña debe tener al menos 6 caracteres.');
  });
});
