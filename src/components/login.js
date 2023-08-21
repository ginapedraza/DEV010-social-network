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
  // const getEmail = inputEmail.value;
  // const getPass = inputPass.value;

  title.textContent = 'Inicia sesión';
  buttonLogin.textContent = 'Ingresar';

  buttonReturn.textContent = 'Volver atrás';

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const getEmail = inputEmail.value;
    const getPass = inputPass.value;

    try {
      const userCredential = await signIn(getEmail, getPass);
      if (userCredential.user.emailVerified) {
        // El usuario está autenticado y su correo está verificado.
        navigateTo('/feed');
      } else {
        alert('Aun no verificas tu email');
      }
    } catch (error) {
      // Manejar el error de autenticación o verificación de correo aquí.
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado. Verifica tus credenciales.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Verifica tus credenciales.');
      } else if (error.code === 'auth/user-disabled') {
        alert('Tu cuenta ha sido deshabilitada. Contacta al soporte.');
      } else if (error.code === 'auth/user-mismatch') {
        alert('Hay un problema con tu cuenta. Contacta al soporte.');
      } else {
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
      }
    }
  });

  /* buttonLogin.addEventListener('click', (e) => {
    // console.log(e);
    e.preventDefault();
    // console.log('ok');
    signIn(getEmail, getPass)
      .then(() => {
        navigateTo('/feed');
      });
  }); */
  sectionLogo.append(imageLogo);
  sectionGeneral.append(title, form, buttonReturn);
  form.append(inputEmail, inputPass, buttonLogin);
  section.append(sectionLogo, sectionGeneral);

  return section;
}

export default login;
