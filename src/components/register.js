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
  /* function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return emailPattern.test(email);
  } */

  sendEmailButton.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    createUser(email, password);
  });

  // Validación del correo electrónico
  /* if (!isValidEmail(email)) {
      alert('Correo electrónico no válido');
      // Muestra un mensaje de error al usuario
      // Puedes usar una alerta, mostrar un mensaje en el DOM, etc.
    }
  });
  /* const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Usuario registrado:', user);
        // ...

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors
          });
      }); */

  // eslint-disable-next-line max-len
  sectionRegister.append(emailRegister, inputEmail, passRegister, inputPass, sendEmailButton);

  return sectionRegister;
}
export default register;
