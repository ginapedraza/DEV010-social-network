import {
  // eslint-disable-next-line max-len
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  addDoc, collection, getDocs, orderBy, query, updateDoc, deleteDoc, Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import azul from '../images/azul.png';
import brazoLike from '../images/brazoLike.png';
import brazoLiked from '../images/brazoLiked.png';
import trash from '../images/trash.png';
import editar from '../images/editar.png';
import close from '../images/close.png';

// permite iniciar sesión con una cuenta de Google.
const loginWithGoogle = () => {
  // se crea una instancia del proveedor de autenticación de Google
  const provider = new GoogleAuthProvider();
  // la funcion se usa  para mostrar un cuadro emergente de inicio de
  // sesión con la cuenta de Google.
  return signInWithPopup(auth, provider)
  // Si el inicio de sesión es exitoso, se devuelve el resultado
    .then((result) => result)
    // Si ocurre algún error, se lanza una excepción.
    .catch((error) => {
      throw error;
    });
};

// permite crear un usuario en la base de datos de autenticación con el correo y la contraseña
// eslint-disable-next-line max-len
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función que inicia sesión con email y password
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función para agregar un post a la base de datos
const addPost = async (post) => {
  const name = auth.currentUser.displayName;
  const date = Timestamp.now();
  // Crea una referencia a la colección "posts" en la base de datos.
  const postsCollection = collection(db, 'posts');
  // Agrega un nuevo documento a la colección "posts" con los campos:
  await addDoc(postsCollection, {
    name,
    post,
    date,
    likes: [],
    likesCount: 0,
  });
};
// se encarga de mostrar los posts en el perfil.
const showPostsProfile = async () => {
  // realiza una consulta a la colección "posts" ordenada por fecha descendente
  const querySnapshot = query(collection(db, 'posts'), orderBy('date', 'desc'));
  // obtiene los documentos resultantes de la consulta.
  const postsSnapshot = await getDocs(querySnapshot);
  const getPostSection = document.getElementById('post-section');
  getPostSection.innerHTML = '';
  // recorre cada documento en la colección "postsSnapshot"
  // y crea elementos HTML para mostrar cada publicación.
  postsSnapshot.forEach((doc) => {
    const individualPost = document.createElement('article');
    individualPost.setAttribute('id', 'individual-post');
    individualPost.classList.add('individual-post');
    const post = doc.data();
    const divProfile = document.createElement('div');
    divProfile.classList.add('div-profile');
    const imgProfile = document.createElement('img');
    const postNameUser = document.createElement('h4');
    postNameUser.classList.add('user-name');
    const postContent = document.createElement('p');
    postContent.classList.add('user-post');
    const postDate = document.createElement('p');
    postDate.classList.add('date');
    postDate.textContent = post.date.toDate().toLocaleDateString();
    const photo = auth.currentUser.photoURL;
    if (photo === null || photo === undefined) {
      imgProfile.src = azul;
    } else {
      imgProfile.src = auth.currentUser.photoURL;
    }
    imgProfile.style.borderRadius = '50%';
    imgProfile.style.height = '40px';
    imgProfile.style.width = '40px';
    postNameUser.textContent = post.name;
    postContent.textContent = post.post;
    const isCurrentUserPost = post.name === auth.currentUser.displayName;
    // verifica si el usuario actual es el autor de la publicación
    if (isCurrentUserPost) {
      const sectionLike = document.createElement('section');
      sectionLike.classList.add('section-like');
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
      editButton.src = editar;
      editButton.alt = 'Editar publicación';
      const deleteButton = document.createElement('img');
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      deleteButton.classList.add('delete-button');
      deleteButton.src = trash;
      deleteButton.alt = 'Eliminar publicación';
      individualPost.append(sectionButtons);
      sectionButtons.append(buttonEdit, buttonDelete);
      buttonEdit.append(editButton);
      buttonDelete.append(deleteButton);
      // Si el botón de edición existe
      if (editButton) {
        editButton.addEventListener('click', () => {
          // se crea el dialog
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
          // Se crea un textarea con el valor del post
          textareaEdit.value = post.post;
          const saveButton = document.createElement('button');
          saveButton.classList.add('save-button');
          saveButton.textContent = 'Guardar';
          const closeIconSection = document.createElement('section');
          closeIconSection.classList.add('close-icon');
          const closeEdit = document.createElement('img');
          closeEdit.src = close;
          closeEdit.alt = 'Cerrar pantalla de edición';
          closeEdit.classList.add('close-edit');
          const closeEditButton = document.createElement('button');
          closeEditButton.classList.add('closeedit-button');
          //  mostrar el cuadro de diálogo
          popUp.showModal();
          closeIconSection.append(closeEditButton);
          closeEditButton.append(closeEdit);
          popUp.append(closeIconSection, editDescription, line, textareaEdit, saveButton);
          saveButton.addEventListener('click', async () => {
            // obtiene el valor del textareaEdit y lo guarda en la variable editedPost.
            const editedPost = textareaEdit.value;
            //  actualizar el documento con el nuevo valor del post.
            await updateDoc(doc.ref, { post: editedPost });
            // actualiza la propiedad post del objeto post con el nuevo valor
            post.post = editedPost;
            // actualiza el contenido de postContent con el nuevo valor.
            postContent.textContent = editedPost;
            // elimina el elemento popUp.
            popUp.remove();
          });
          closeEditButton.addEventListener('click', () => {
            popUp.remove();
          });
        });
      }
      // Si el botón deleteButton existe
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
          // muestra el ¿Estás seguro..?
          popUpDelete.showModal();
          popUpDelete.append(editDescription, buttonSection);
          buttonSection.append(acceptButton, cancelButton);
          acceptButton.addEventListener('click', async () => {
            try {
              // Intenta eliminar un documento
              await deleteDoc(doc.ref);
              // elimina el elemento "individualPost" del DOM.
              individualPost.remove();
            } catch (error) {
              console.error('error deleting the post:', error);
            } finally {
              // finalmente, elimina el elemento popUp.
              popUpDelete.remove();
            }
          });
          cancelButton.addEventListener('click', () => {
            popUpDelete.remove();
          });
        });
      }
      getPostSection.append(individualPost);
      divProfile.append(imgProfile, postNameUser);
      individualPost.append(divProfile, postContent, sectionLike);
      sectionLike.append(postDate);
    }
  });
};
// Función para mostrar todos los posts
const showPosts = async () => {
  // realiza una consulta a la colección "posts" ordenada por fecha descendente.
  const querySnapshot = query(collection(db, 'posts'), orderBy('date', 'desc'));
  // obtiene los documentos de esa consulta y guarda el resultado
  const postsSnapshot = await getDocs(querySnapshot);
  // obtiene la sección de posts del DOM y la vacía.
  const getPostSection = document.getElementById('post-section');
  getPostSection.innerHTML = '';
  postsSnapshot.forEach((doc) => {
    const individualPost = document.createElement('article');
    individualPost.setAttribute('id', 'individual-post');
    individualPost.classList.add('individual-post');
    // guarda los datos del documento doc en la variable post. Esto permite acceder
    // a los datos almacenados en el documento y utilizarlos posteriormente en el código.
    const post = doc.data();
    const divProfile = document.createElement('div');
    divProfile.classList.add('div-profile');
    const imgProfile = document.createElement('img');
    const postNameUser = document.createElement('h4');
    postNameUser.classList.add('user-name');
    const postContent = document.createElement('p');
    postContent.classList.add('user-post');
    const postDate = document.createElement('p');
    postDate.classList.add('date');
    postDate.textContent = post.date.toDate().toLocaleDateString();
    const isCurrentUserPost = post.name === auth.currentUser.displayName;
    // Si el usuario actual es el autor de la publicación
    if (isCurrentUserPost) {
      // se verifica si tiene una foto de perfil.
      const photo = auth.currentUser.photoURL;
      // Si no tiene una foto, se establece la imagen del perfil
      if (photo === null || photo === undefined) {
        imgProfile.src = azul;
        // De lo contrario, se establece la imagen de la foto del usuario actual.
      } else {
        // Si el usuario no es el autor, se establece la imagen del perfil como "azul".
        imgProfile.src = auth.currentUser.photoURL;
      }
    } else {
      imgProfile.src = azul;
    }
    imgProfile.style.borderRadius = '50%';
    imgProfile.style.height = '40px';
    imgProfile.style.width = '40px';

    postNameUser.textContent = post.name;
    postContent.textContent = post.post;
    const sectionLike = document.createElement('section');
    sectionLike.classList.add('section-like');
    const subSectionLike = document.createElement('section');
    subSectionLike.classList.add('subsection');
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    const likeImage = document.createElement('img');
    likeImage.src = brazoLike;
    likeImage.alt = 'Dar like a la publicación';
    likeImage.classList.add('likeImgFeed');
    // Comprueba si el objeto post.likes existe y si el array post.likes incluye
    // el ID del usuario actual (auth.currentUser.uid). Si se cumple esta condición,
    // la variable userLiked será verdadera, de lo contrario será falsa.
    let userLiked = post.likes && post.likes.includes(auth.currentUser.uid);
    const likesCount = document.createElement('p');
    likesCount.classList.add('counter');
    likesCount.textContent = post.likes.length;
    // Si userLiked es verdadero, se asigna la imagen brazoLiked,
    // de lo contrario se asigna la imagen brazoLike.
    likeImage.src = userLiked ? brazoLiked : brazoLike;

    likeButton.addEventListener('click', async (e) => {
      e.preventDefault();
      // se obtiene el ID del usuario actual
      const userId = auth.currentUser.uid;
      const arrayLikes = post.likes;
      // "tempArrayLikes" que es igual a "arrayLikes" si existe, de lo contrario es un array vacío.
      const tempArrayLikes = arrayLikes || [];
      // se verifica si el ID del usuario está incluido en "tempArrayLikes"
      // y el resultado se asigna a la variable "userLiked".
      userLiked = tempArrayLikes.includes(userId);

      try {
        // Verifica que el usuario no haya dado like antes
        if (userLiked === false) {
          // Si esta condición se cumple, se actualiza la imagen del botón de "like"
          likeImage.src = brazoLiked;
          // se agrega el ID del usuario al array tempArrayLikes
          tempArrayLikes.push(userId);
          // se obtiene la longitud del array
          const arrayLikesLength = tempArrayLikes.length;
          // se actualizan los documentos en Firestore con los nuevos valores
          await updateDoc(doc.ref, { likes: tempArrayLikes });
          await updateDoc(doc.ref, { likesCount: arrayLikesLength });
          // se actualiza el contenido del contador de likes en el elemento HTML correspondiente
          likesCount.textContent = arrayLikesLength.toString();
        }
        // Si le dió like
        if (userLiked) {
          // tiene imagen oscura
          likeImage.src = brazoLike;
          // Se busca el índice del ID del usuario en el array tempArrayLikes
          const indexUserLikesArray = tempArrayLikes.indexOf(userId);
          // se elimina ese elemento.
          tempArrayLikes.splice(indexUserLikesArray, 1);
          // Se obtiene la longitud actualizada del array tempArrayLikes
          const arrayLikesLength = tempArrayLikes.length;
          // Se actualizan los documentos en Firestore con el nuevo valor de tempArrayLikes
          await updateDoc(doc.ref, { likes: tempArrayLikes });
          await updateDoc(doc.ref, { likesCount: arrayLikesLength });
          // Se actualiza el contador de likes en el elemento HTML correspondiente con la longitud
          // del array convertida a cadena de texto.
          likesCount.textContent = arrayLikesLength.toString();
        }
      } catch (error) {
        console.error('Error updating the post:', error);
      }
    });
    // Botones de accesibilidad
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
    // Verificar si el nombre del autor de la publicación
    const isCurrentUser = post.name === auth.currentUser.displayName;
    if (isCurrentUser) {
      const sectionButtons = document.createElement('section');
      sectionButtons.classList.add('section-buttons-post');
      const buttonEdit = document.createElement('button');
      buttonEdit.classList.add('button-edit');
      const editButton = document.createElement('img');
      editButton.classList.add('edit-button');
      editButton.src = editar;
      editButton.alt = 'Editar publicación';
      const deleteButton = document.createElement('img');
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('button-delete');
      deleteButton.classList.add('delete-button');
      deleteButton.src = trash;
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
          textareaEdit.value = post.post;
          const saveButton = document.createElement('button');
          saveButton.classList.add('save-button');
          saveButton.textContent = 'Guardar';
          const closeIconSection = document.createElement('section');
          closeIconSection.classList.add('close-icon');
          const closeEdit = document.createElement('img');
          closeEdit.src = close;
          closeEdit.alt = 'Cerrar pantalla de edición';
          closeEdit.classList.add('close-edit');
          const closeEditButton = document.createElement('button');
          closeEditButton.classList.add('closeedit-button');
          popUp.showModal();
          closeIconSection.append(closeEditButton);
          closeEditButton.append(closeEdit);
          popUp.append(closeIconSection, editDescription, line, textareaEdit, saveButton);
          closeEditButton.addEventListener('click', () => {
            popUp.remove();
          });
          saveButton.addEventListener('click', async () => {
            const editedPost = textareaEdit.value;
            await updateDoc(doc.ref, { post: editedPost });
            post.post = editedPost;
            postContent.textContent = editedPost;
            popUp.remove();
          });
        });
      }
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
              popUpDelete.remove();
            }
          });
          cancelButton.addEventListener('click', () => {
            popUpDelete.remove();
          });
        });
      }
    }
    divProfile.append(imgProfile, postNameUser);
    individualPost.append(divProfile, postContent, postDate, sectionLike);
    getPostSection.append(individualPost);
    sectionLike.append(postDate, subSectionLike);
    subSectionLike.append(likeButton, likesCount);
    likeButton.append(likeImage);
    likeButton.append(likeImage);
  });
};
// acá llamamos a signOut que es de firebase y nos permite cerrar sesión, exportamos
// a feed.js para utilizarla con el boton
const logOut = async () => {
  // await asegura que el cierre de sesión se complete antes de continuar con cualquier otra tarea.
  await signOut(auth);
};

export {
  // eslint-disable-next-line max-len
  loginWithGoogle, createUser, signIn, addPost, showPosts, logOut, showPostsProfile,
};
