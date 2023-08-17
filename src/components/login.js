import { signIn } from '../firebase';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('loginSection');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  inputPass.type = 'password';
  const buttonLogin = document.createElement('button');
  inputEmail.placeholder = 'Correo electrónico';
  inputPass.placeholder = 'Contraseña';
  const getEmail = inputEmail.value;
  const getPass = inputPass.value;

  title.textContent = 'Inicia sesión';
  buttonLogin.textContent = 'Ingresar';

  buttonReturn.textContent = 'Volver atrás';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonLogin.addEventListener('click', (e) => {
    // console.log(e);
    e.preventDefault();
    // console.log('ok');
    signIn(getEmail, getPass)
      .then(() => {
        navigateTo('/feed');
      });
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonReturn);

  return section;
}

export default login;
