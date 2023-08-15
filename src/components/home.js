import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function home(navigateTo) {
  const section = document.createElement('section');
  section.addClassList = 'homeContainer';
  const titleLogin = document.createElement('h2');
  const emailButton = document.createElement('button');
  emailButton.addClassList = 'loginButton';
  const googleButton = document.createElement('button');
  googleButton.addClassList = 'loginButton';

  emailButton.textContent = 'Correo electrónico';
  googleButton.textContent = 'Google';

  emailButton.addEventListener('click', () => {
    navigateTo('/login');
  });

  googleButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
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
  titleLogin.textContent = 'Inicia sesión';

  section.append(titleLogin, emailButton, googleButton);
  return section;
}

export default home;
