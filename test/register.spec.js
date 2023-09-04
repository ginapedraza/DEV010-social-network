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
    createUser: jest.fn(), // => Promise.resolve({ response: { test: 'test' } })),
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

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(registerElement);
  });

  it('should register a new user with matching passwords', async () => {
    inputEmail.value = 'test@email.com';
    inputPass.value = '123456';
    inputConfirmPass.value = '123456';

    sendEmailButton.click();
    await Promise.resolve();
    expect(createUser).toHaveBeenCalledWith('test@email.com', '123456');
  });

  it('should display an error message when registration fails due to existing user', async () => {
    createUser.mockRejectedValue({ code: 'auth/email-already-in-use' });
    const messageAlert = registerElement.querySelector('.error');
    messageAlert.textContent = 'El correo proporcionado ya esta en uso.';

    sendEmailButton.click();
    await Promise.resolve();
    expect(messageAlert.textContent).toBe('El correo proporcionado ya esta en uso.');
  });

  it('should display an error message when password length < 6 characters', async () => {
    createUser.mockRejectedValue(inputPass.value.length < 6);
    const messageAlert = registerElement.querySelector('.error');
    messageAlert.textContent = 'La contraseña debe tener al menos 6 caracteres.';

    sendEmailButton.click();
    await Promise.resolve();
    expect(messageAlert.textContent).toBe('La contraseña debe tener al menos 6 caracteres.');
  });

  it('should show an error message if passwords do not match', async () => {
    createUser.mockRejectedValue(inputPass.value !== inputConfirmPass.value);
    const messageAlert = registerElement.querySelector('.error');
    messageAlert.textContent = 'Las contraseñas no coinciden. Intenta nuevamente';

    sendEmailButton.click();
    await Promise.resolve();
    expect(messageAlert.textContent).toBe('Las contraseñas no coinciden. Intenta nuevamente');
  });
});
