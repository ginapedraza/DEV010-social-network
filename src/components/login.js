import { signIn } from '../firebase';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('loginSection');
  const sectionLogo = document.createElement('section');
  sectionLogo.classList.add('logo-section');
  const imageLogo = document.createElement('img');
  imageLogo.src = 'images/logo-login.png';
  imageLogo.alt = 'Logo TweetFit';
  imageLogo.classList.add('logoImg');
  const sectionGeneral = document.createElement('section');
  sectionGeneral.classList.add('generalLogin');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  form.classList.add('formStyle');
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
  sectionLogo.append(imageLogo);
  sectionGeneral.append(title, form, buttonReturn);
  form.append(inputEmail, inputPass, buttonLogin);
  section.append(sectionLogo, sectionGeneral);

  return section;
}

export default login;
