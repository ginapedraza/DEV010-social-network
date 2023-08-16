import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

function home(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('homeSection');
  const titleLogin = document.createElement('h2');
  const emailButton = document.createElement('button');
  emailButton.classList.add('loginButton');
  const googleButton = document.createElement('button');
  googleButton.classList.add('loginButton');
  const titleRegister = document.createElement('h3');
  const registerButton = document.createElement('button');
  registerButton.classList.add('registerButton');

  emailButton.textContent = 'Correo electrónico';
  googleButton.textContent = 'Google';
  titleLogin.textContent = 'Inicia sesión';
  titleRegister.textContent = 'Si no tienes cuenta';
  registerButton.textContent = 'Regístrate';

  emailButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  registerButton.addEventListener('click', () => {
    navigateTo('/register');
  });

  googleButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });

  section.append(titleLogin, emailButton, googleButton, titleRegister, registerButton);
  return section;
}

export default home;
