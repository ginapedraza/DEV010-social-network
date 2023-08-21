import { createUser } from '../firebase.js';

function register() {
  const sectionRegister = document.createElement('section');
  sectionRegister.classList.add('registerSection');
  const emailRegister = document.createElement('h4');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('id', 'email');
  const passRegister = document.createElement('h4');
  const inputPass = document.createElement('input');
  inputPass.type = 'password';
  inputPass.setAttribute('id', 'pass');
  // const repeatPassRegister = document.createElement('h4');
  // const inputRepeatPass = document.createElement('input');
  // inputRepeatPass.setAttribute('id', 'repeated');

  const sendEmailButton = document.createElement('button');
  sendEmailButton.classList.add('sendEmail');

  emailRegister.textContent = 'Correo electrónico';
  passRegister.textContent = 'Contraseña';
  // repeatPassRegister.textContent = 'Repite la contraseña';
  sendEmailButton.textContent = 'Enviar correo electrónico';

  sendEmailButton.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    createUser(email, password);
  });

  // eslint-disable-next-line max-len
  sectionRegister.append(emailRegister, inputEmail, passRegister, inputPass, sendEmailButton);

  return sectionRegister;
}
export default register;
