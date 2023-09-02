import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from 'firebase/auth';
import {
  addDoc, collection, getDocs, orderBy, query, updateDoc, deleteDoc,
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
/* const showName = () => {
  const getProfileTextSection = document.querySelector('.profiletext-section');
  const nameUser = document.createElement('h4');
  nameUser.classList.add('name-user');
  nameUser.textContent = 'hola + post.name';
  getProfileTextSection.append(nameUser);
}; */

const showPostsProfile = async () => {
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
    postNameUser.classList.add('user-name');
    const postContent = document.createElement('p');
    postContent.classList.add('user-post');
    const postDate = document.createElement('p');
    postDate.classList.add('date');
    postDate.textContent = post.date.toDate().toLocaleDateString();
    postNameUser.textContent = post.name;
    postContent.textContent = post.post;
    const isCurrentUserPost = post.name === auth.currentUser.displayName;
    if (isCurrentUserPost) {
      // Sección del Like
      const sectionLike = document.createElement('section');
      sectionLike.classList.add('section-like');
      const likeButton = document.createElement('button');
      likeButton.classList.add('like-button');
      const likeImage = document.createElement('img');
      likeImage.src = '/images/icono-brazo-like.png';
      likeImage.alt = 'Dar like a la publicación';
      likeImage.classList.add('likeImgFeed');
      const getReduceButton = document.querySelector('#reduceButton');
      const getIncreaseButton = document.querySelector('#increaseButton');
      const getNormalButton = document.querySelector('#normalButton');
      getReduceButton.addEventListener('click', () => {
        postContent.style.fontSize = '0.8rem';
        postNameUser.style.fontSize = '0.9rem';
      });
      getIncreaseButton.addEventListener('click', () => {
        postContent.style.fontSize = '1.1rem';
        postNameUser.style.fontSize = '1.2rem';
      });
      getNormalButton.addEventListener('click', () => {
        postContent.style.fontSize = '0.9rem';
        postNameUser.style.fontSize = '1rem';
      });
      // Sección botones editar y borrar
      const sectionButtons = document.createElement('section');
      sectionButtons.classList.add('section-buttons-post');
      const buttonEdit = document.createElement('button');
      buttonEdit.classList.add('button-edit');
      const editButton = document.createElement('img');
      editButton.classList.add('edit-button');
      editButton.src = '/images/editar.png';
      editButton.alt = 'Editar publicación';
      const deleteButton = document.createElement('img');
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      deleteButton.classList.add('delete-button');
      deleteButton.src = '/images/trash.png';
      deleteButton.alt = 'Eliminar publicación';
      individualPost.append(sectionButtons);
      sectionButtons.append(buttonEdit, buttonDelete);
      buttonEdit.append(editButton);
      buttonDelete.append(deleteButton);
      if (editButton) {
        editButton.addEventListener('click', () => {
          const popUp = document.createElement('dialog');
          popUp.setAttribute('id', 'popUp');
          popUp.classList.add('popUp-edit');
          const generalSection = document.getElementById('general-section');
          generalSection.appendChild(popUp);
          const line = document.createElement('section');
          line.classList.add('line');
          const editDescription = document.createElement('h4');
          editDescription.classList.add('edit-description');
          editDescription.textContent = 'Edita tu publicación';
          const textareaEdit = document.createElement('textarea');
          textareaEdit.classList.add('textarea-edit');
          // textareaEdit.setAttribute('id', 'edit-textarea');
          // const editTextArea = document.getElementById('edit-textarea');
          textareaEdit.value = post.post;
          const saveButton = document.createElement('button');
          saveButton.classList.add('save-button');
          saveButton.textContent = 'Guardar';
          const closeIconSection = document.createElement('section');
          closeIconSection.classList.add('close-icon');
          const closeEdit = document.createElement('img');
          closeEdit.src = '/images/close-edit.png';
          closeEdit.alt = 'Cerrar pantalla de edición';
          closeEdit.classList.add('close-edit');
          const closeEditButton = document.createElement('button');
          closeEditButton.classList.add('closeedit-button');
          popUp.showModal();
          closeIconSection.append(closeEditButton);
          closeEditButton.append(closeEdit);
          popUp.append(closeIconSection, editDescription, line, textareaEdit, saveButton);
          saveButton.addEventListener('click', async () => {
            const editedPost = textareaEdit.value;
            await updateDoc(doc.ref, { post: editedPost });
            post.post = editedPost;
            postContent.textContent = editedPost;
            popUp.remove();
          });
          closeEditButton.addEventListener('click', () => {
            popUp.close();
          });
        });
      }
      // fin de if (editButton)
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          const popUpDelete = document.createElement('dialog');
          popUpDelete.setAttribute('id', 'popUp-delete');
          popUpDelete.classList.add('popUp-delete');
          const generalSection = document.getElementById('general-section');
          generalSection.appendChild(popUpDelete);
          const editDescription = document.createElement('h4');
          editDescription.classList.add('delete-description');
          editDescription.textContent = '¿Estás seguro que quieres eliminar tu publicación?';
          const buttonSection = document.createElement('section');
          buttonSection.classList.add('button-section');
          const acceptButton = document.createElement('button');
          acceptButton.classList.add('accept-button');
          acceptButton.textContent = 'Eliminar';
          const cancelButton = document.createElement('button');
          cancelButton.classList.add('cancel-button');
          cancelButton.textContent = 'Cancelar';
          popUpDelete.showModal();
          popUpDelete.append(editDescription, buttonSection);
          buttonSection.append(acceptButton, cancelButton);
          acceptButton.addEventListener('click', async () => {
            try {
              await deleteDoc(doc.ref);
              individualPost.remove();
            } catch (error) {
              console.error('error deleting the post:', error);
            } finally {
              popUpDelete.close();
            }
          });
          cancelButton.addEventListener('click', () => {
            popUpDelete.close();
          });
        });
      }
      // fin de if(deleteButton)
      // if (currentUser)
      getPostSection.append(individualPost);
      individualPost.append(postNameUser, postContent, postDate, sectionLike);
      sectionLike.append(likeButton);
      likeButton.append(likeImage);
    }
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
    postNameUser.classList.add('user-name');
    const postContent = document.createElement('p');
    postContent.classList.add('user-post');
    const postDate = document.createElement('p');
    postDate.classList.add('date');
    postDate.textContent = post.date.toDate().toLocaleDateString();
    postNameUser.textContent = post.name;
    postContent.textContent = post.post;
    // Sección del Like
    const sectionLike = document.createElement('section');
    sectionLike.classList.add('section-like');
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    const likeImage = document.createElement('img');
    likeImage.src = '/images/icono-brazo-like.png';
    likeImage.alt = 'Dar like a la publicación';
    likeImage.classList.add('likeImgFeed');
    const getReduceButton = document.querySelector('#reduceButton');
    const getIncreaseButton = document.querySelector('#increaseButton');
    const getNormalButton = document.querySelector('#normalButton');
    getReduceButton.addEventListener('click', () => {
      postContent.style.fontSize = '0.8rem';
      postNameUser.style.fontSize = '0.9rem';
    });
    getIncreaseButton.addEventListener('click', () => {
      postContent.style.fontSize = '1.1rem';
      postNameUser.style.fontSize = '1.2rem';
    });
    getNormalButton.addEventListener('click', () => {
      postContent.style.fontSize = '0.9rem';
      postNameUser.style.fontSize = '1rem';
    });
    // Sección botones editar y borrar
    const isCurrentUserPost = post.name === auth.currentUser.displayName;
    if (isCurrentUserPost) {
      const sectionButtons = document.createElement('section');
      sectionButtons.classList.add('section-buttons-post');
      const buttonEdit = document.createElement('button');
      buttonEdit.classList.add('button-edit');
      const editButton = document.createElement('img');
      editButton.classList.add('edit-button');
      editButton.src = '/images/editar.png';
      editButton.alt = 'Editar publicación';
      const deleteButton = document.createElement('img');
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      deleteButton.classList.add('delete-button');
      deleteButton.src = '/images/trash.png';
      deleteButton.alt = 'Eliminar publicación';
      individualPost.append(sectionButtons);
      sectionButtons.append(buttonEdit, buttonDelete);
      buttonEdit.append(editButton);
      buttonDelete.append(deleteButton);
      /*  $('#resettext').click(function() {
        if (curSize != 18)
          $('#content').css('font-size', 18);
      });
      $('#decreasetext').click(function() {
        curSize = parseInt($('#content').css('font-size')) - 2;
        if (curSize >= 14)
          $('#content').css('font-size', curSize);
      });
 */
      if (editButton) {
        editButton.addEventListener('click', () => {
          const popUp = document.createElement('dialog');
          popUp.setAttribute('id', 'popUp');
          popUp.classList.add('popUp-edit');
          const generalSection = document.getElementById('general-section');
          generalSection.appendChild(popUp);
          const line = document.createElement('section');
          line.classList.add('line');
          const editDescription = document.createElement('h4');
          editDescription.classList.add('edit-description');
          editDescription.textContent = 'Edita tu publicación';
          const textareaEdit = document.createElement('textarea');
          textareaEdit.classList.add('textarea-edit');
          // textareaEdit.setAttribute('id', 'edit-textarea');
          // const editTextArea = document.getElementById('edit-textarea');
          textareaEdit.value = post.post;
          const saveButton = document.createElement('button');
          saveButton.classList.add('save-button');
          saveButton.textContent = 'Guardar';
          const closeIconSection = document.createElement('section');
          closeIconSection.classList.add('close-icon');
          const closeEdit = document.createElement('img');
          closeEdit.src = '/images/close-edit.png';
          closeEdit.alt = 'Cerrar pantalla de edición';
          closeEdit.classList.add('close-edit');
          const closeEditButton = document.createElement('button');
          closeEditButton.classList.add('closeedit-button');
          popUp.showModal();
          closeIconSection.append(closeEditButton);
          closeEditButton.append(closeEdit);
          popUp.append(closeIconSection, editDescription, line, textareaEdit, saveButton);
          saveButton.addEventListener('click', async () => {
            const editedPost = textareaEdit.value;
            await updateDoc(doc.ref, { post: editedPost });
            post.post = editedPost;
            postContent.textContent = editedPost;
            popUp.remove();
          });
          closeEditButton.addEventListener('click', () => {
            popUp.close();
          });
        });
      }
      // fin de if (editButton)
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          const popUpDelete = document.createElement('dialog');
          popUpDelete.setAttribute('id', 'popUp-delete');
          popUpDelete.classList.add('popUp-delete');
          const generalSection = document.getElementById('general-section');
          generalSection.appendChild(popUpDelete);
          const editDescription = document.createElement('h4');
          editDescription.classList.add('delete-description');
          editDescription.textContent = '¿Estás seguro que quieres eliminar tu publicación?';
          const buttonSection = document.createElement('section');
          buttonSection.classList.add('button-section');
          const acceptButton = document.createElement('button');
          acceptButton.classList.add('accept-button');
          acceptButton.textContent = 'Eliminar';
          const cancelButton = document.createElement('button');
          cancelButton.classList.add('cancel-button');
          cancelButton.textContent = 'Cancelar';
          popUpDelete.showModal();
          popUpDelete.append(editDescription, buttonSection);
          buttonSection.append(acceptButton, cancelButton);
          acceptButton.addEventListener('click', async () => {
            try {
              await deleteDoc(doc.ref);
              individualPost.remove();
            } catch (error) {
              console.error('error deleting the post:', error);
            } finally {
              popUpDelete.close();
            }
          });
          cancelButton.addEventListener('click', () => {
            popUpDelete.close();
          });
        });
      }
      // fin de if(deleteButton)
    }
    // if (currentUser)
    getPostSection.append(individualPost);
    individualPost.append(postNameUser, postContent, postDate, sectionLike);
    sectionLike.append(likeButton);
    likeButton.append(likeImage);
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
  // eslint-disable-next-line max-len
  loginWithGoogle, createUser, signIn, addPost, showPosts, logOut, restorePassword, showPostsProfile,
};
