import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from 'firebase/auth';
import {
  addDoc, collection, getDocs, orderBy, query,
} from 'firebase/firestore';
import { db, auth } from '../firebase.js';
// Función que inicia sesión con google
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  // const auth = getAuth(app);
  return signInWithPopup(auth, provider)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

// Función que crea el usuario con correo y contraseña
// eslint-disable-next-line max-len
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para crear un post
const addPost = async (name, post, date) => {
  const postsCollection = collection(db, 'posts');
  await addDoc(postsCollection, {
    name,
    post,
    date,
  });
};

// Función para mostrar todos los posts
const showPosts = async () => {
  // Aquí hice cambios con query
  const querySnapshot = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const postsSnapshot = await getDocs(querySnapshot);
  // const querySnapshot = await getDocs(collection(db, 'posts'), orderBy('date', 'desc'));
  const getPostSection = document.getElementById('post-section');
  getPostSection.innerHTML = '';
  postsSnapshot.forEach((doc) => {
    const individualPost = document.createElement('article');
    individualPost.setAttribute('id', 'individual-post');
    individualPost.classList.add('individual-post');
    const post = doc.data();
    const postNameUser = document.createElement('h4');
    const postContent = document.createElement('p');
    const postDate = document.createElement('p');
    postDate.classList.add('date');
    postDate.textContent = post.date.toDate().toLocaleDateString();
    postNameUser.textContent = post.name;
    postContent.textContent = post.post;
    // Sección del Like
    const sectionLike = document.createElement('section');
    sectionLike.classList.add('section-like');
    const likeImage = document.createElement('img');
    likeImage.src = '/images/icono-brazo-like.png';
    likeImage.alt = 'Icono de Like';
    likeImage.classList.add('likeImgFeed');
    // Sección botones editar y borrar
    const isCurrentUserPost = post.name === auth.currentUser.displayName;
    if (isCurrentUserPost) {
      const sectionButtons = document.createElement('section');
      sectionButtons.classList.add('section-buttons-post');
      const editButton = document.createElement('img');
      editButton.classList.add('edit-button');
      editButton.src = '/images/editar.png';
      editButton.alt = 'Icono de editar';
      individualPost.append(sectionButtons);
      sectionButtons.append(editButton);

      if (editButton) {
        editButton.addEventListener('click', () => {
          const popUp = document.createElement('dialog');
          popUp.setAttribute('id', 'popUp');
          popUp.classList.add('popUp-edit');
          console.log(popUp);
          const generalSection = document.getElementById('general-section');
          generalSection.appendChild(popUp);
          const editDescription = document.createElement('h4');
          editDescription.classList.add('edit-description');
          editDescription.textContent = 'Edita tu publicación';
          const textareaEdit = document.createElement('textarea');
          textareaEdit.classList.add('textarea-edit');
          // textareaEdit.setAttribute('id', 'edit-textarea');
          // const editTextArea = document.getElementById('edit-textarea');
          textareaEdit.value = post.post;
          console.log(textareaEdit.value);
          const saveButton = document.createElement('button');
          saveButton.classList.add('save-button');
          saveButton.textContent = 'Guardar';
          const closeIconSection = document.createElement('section');
          closeIconSection.classList.add('close-icon');
          const closeEdit = document.createElement('img');
          closeEdit.src = '/images/close-edit.png';
          closeEdit.alt = 'Cerrar';
          closeEdit.classList.add('close-edit');
          popUp.showModal();
          closeIconSection.append(closeEdit);
          popUp.append(closeIconSection, editDescription, textareaEdit, saveButton);

          closeEdit.addEventListener('click', () => {
            popUp.close();
          });
        });
      }
    }
    getPostSection.append(individualPost);
    individualPost.append(postNameUser, postContent, postDate, sectionLike);
    sectionLike.append(likeImage);
  });
};
// acá llamamos a signOut que es de firebase y nos permite cerrar sesión, exportamos
// a feed.js para utilizarla con el boton
const logOut = async () => {
  await signOut(auth);
};

const restorePassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    return error;
  }
};

export {
  loginWithGoogle, createUser, signIn, addPost, showPosts, logOut, restorePassword,
};
