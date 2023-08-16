import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function register() {
  const sectionRegister = document.createElement('section');
  sectionRegister.addClassList = 'registerSection';
  const emailRegister = document.createElement('h4');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('id', 'email');
  const userRegister = document.createElement('h4');
  const inputUser = document.createElement('input');
  inputUser.setAttribute('id', 'user');
  const passRegister = document.createElement('h4');
  const inputPass = document.createElement('input');
  inputPass.setAttribute('id', 'pass');
  const repeatPassRegister = document.createElement('h4');
  const inputRepeatPass = document.createElement('input');
  inputRepeatPass.setAttribute('id', 'repeated');
  const registeredButton = document.createElement('button');
  registeredButton.addClassList = 'registeredButton';

  emailRegister.textContent = 'Correo electrónico';
  userRegister.textContent = 'Nombre de usuario';
  passRegister.textContent = 'Contraseña';
  repeatPassRegister.textContent = 'Repite la contraseña';
  registeredButton.textContent = 'Regístrate';

  // eslint-disable-next-line max-len
  sectionRegister.append(emailRegister, inputEmail, userRegister, inputUser, passRegister, inputPass, repeatPassRegister, inputRepeatPass, registeredButton);

  return sectionRegister;
}
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

export default register;
