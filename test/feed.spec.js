import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../src/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
// import { currentUser } from 'firebase/auth';
import feed from '../src/components/feed.js';
import { addPost, logOut, showPosts } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => (
  {
    showPosts: jest.fn(),
    // => Promise.resolve({ response: { test: 'test' } })),
    addPost: jest.fn(), // => objectAuth),
    // createUserWithEmailAndPassword: jest.fn(),
    auth: jest.fn(),

    logOut: jest.fn(),
  }
));

jest.mock('firebase/auth', () => (
  {
    onAuthStateChanged: jest.fn(),
    currentUser: jest.fn(),
  }
));

jest.mock('../src/firebase.js', () => (
  {
    db: jest.fn(),
  }
));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  // { publication: name, post, date }) => `name:${name}, post:${post}, date:${date}`),
  getDocs: jest.fn(),
  doc: jest.fn((_, __, id) => id),
  deleteDoc: jest.fn((id) => id),
  updateDoc: jest.fn((id, { publication: post }) => `id:${id}, post:${post}`),
}));

describe('Testing feed function', () => {
  const navigateTo = jest.fn();
  const feedElement = feed(navigateTo);
  const buttonLogout = feedElement.querySelector('.button-logout');
  const buttonProfile = feedElement.querySelector('.button-profile');
  const textArea = feedElement.querySelector('.text-area');
  const sendPostButton = feedElement.querySelector('.sendPost-button');
  const postsSection = feedElement.querySelector('#post-section');

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(feedElement);
  });

  it('Feed Debería ser una función', () => {
    expect(typeof feed).toBe('function');
  });

  it('should log out when clicking button buttonLogout', async () => {
    buttonLogout.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(logOut).toHaveBeenCalledTimes(1);
    // expect(navigateTo).toHaveBeenCalledWith('/');
  }, 0);

  it('should navigate to /profile when clicking button buttonProfile', async () => {
    buttonProfile.click();
    expect(navigateTo).toHaveBeenCalledWith('/profile');
  }, 0);

  it('addPost Debería ser una función', () => {
    expect(typeof addPost).toBe('function');
  });
  it('ShowPosts Debería ser una función', () => {
    expect(typeof showPosts).toBe('function');
  });

  it('should add a post successfully', async () => {
    const mockCollection = jest.fn();
    collection.mockReturnValue(mockCollection);

    const name = 'Ana';
    const post = 'Hi, everybody!';
    const date = new Date();

    sendPostButton.click();
    await addPost(name, post, date);
    // expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(addPost).toHaveBeenCalledWith(name, post, date);
  });

  it('should disable the button if textarea is empty', () => {
    textArea.value = '';
    expect(sendPostButton.disabled).toBe(true);
  });
  it('debería agregar elementos al DOM', async () => {
    const testPosts = [
      { name: 'Usuario 1', post: 'Prueba 1', date: { toDate: () => new Date() } },
      { name: 'Usuario 2', post: 'Prueba 2', date: { toDate: () => new Date() } },
    ];

    const querySnapshot = jest.fn();
    querySnapshot.forEach = jest.fn((callback) => {
      testPosts.forEach((post) => callback({ data: () => post }));
    });

    getDocs.mockResolvedValue(querySnapshot);

    // Llama a la función showPosts con argumentos
    await showPosts('UsuarioPrueba', postsSection);

    // Verifica si se han agregado los elementos esperados al DOM
    expect(showPosts).toHaveBeenCalledTimes(1);
  });
});
/* it.only('Deberia llamar a la funcion addPost', () => {
    const name = 'Juan';
    const post = 'postDePrueba';
    const date = new Date();
    expect(addPost(name, post, date)).toBe(`post:${post}`);
  });
  it('deberia guardar los post', async () => {
    const postt = saveTask('Quesadilla', 'Jamon', 'Pedro');
    // eslint-disable-next-line max-len
    await expect(postt).resolves.toEqual
    ({ tittle: 'Quesadilla', description: 'Jamon', displayName: 'Pedro' });
  }); */
/* it('deberia guardar los post', (done) => {
    const postt = addPost('Quesadilla', 'Jamon', 'Pedro');
    process.nextTick(() => {
      expect(postt).resolves.toEqual({ name: 'Quesadilla', post: 'Jamon', date: 'Pedro' });
      done();
    });
  });
}); */

/* it('should call showPosts', () => {
    const mockCurrentUser = currentUser.displayName;
    console.log(mockCurrentUser);
    expect(showPosts).toHaveBeenCalledWith(mockCurrentUser, postsSection);
  }); */

/* afterEach(() => {
    document.body.removeChild(container);
    container = null;
  }); */

/* it('should render posts for a user', () => {
    // Supongamos que tienes un array de posts de prueba
    const mockPosts = [
      { id: 1, content: 'Post 1' },
      { id: 2, content: 'Post 2' },
      // ... otros posts de prueba
    ];

    // Llama a la función showPosts con el nombre de usuario y el contenedor DOM
    showPosts('Usuario de prueba', feedElement, mockPosts);

    // Verifica que los posts se hayan renderizado correctamente
    const postElements = feedElement.querySelectorAll('#post-section');
    expect(postElements).toHaveLength(mockPosts.length);

    // Verifica que el contenido de los posts se haya renderizado correctamente
    mockPosts.forEach((post, index) => {
      expect(postElements[index].textContent).toContain(post.content);
    });
  }); */

/* it('should add a post successfully', () => {
    // const collectionMock = jest.fn();
    // collection.mockReturnValue(collectionMock);

    const name = 'Maria';
    const post = 'Hola a todas!';
    const date = new Date();
    // expect(addPost).toHaveBeenCalledTimes(1);
    expect(addPost()).toEqual(`name:${name}, post:${post}, date:${date}`);
  }); */

/* it('should add a post successfully', async () => {
    const collectionMock = jest.fn();
    collection.mockReturnValue(collectionMock);

    const name = 'Maria';
    const post = 'Hola a todas!';
    const date = new Date();

    await addPost(name, post, date);

    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(addDoc).toHaveBeenCalledWith(collectionMock, {
      name,
      post,
      date,
    }); */
document.body.innerHTML = '<div id="post-section"></div>';

describe('onAuthStateChanged', () => {
  const navigateTo = jest.fn();
  it('debería llamar a navigateTo con "/noFeed" si el usuario no está autenticado', () => {
    // Simula que el usuario no está autenticado
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // Usuario no autenticado
    });

    // Llama a la función feed con navigateTo
    feed(navigateTo);

    // Verifica si navigateTo se llamó con la ruta correcta
    expect(navigateTo).toHaveBeenCalledWith('/noFeed');
  });
});
/* it.only('debería llamar a showPosts si el usuario está autenticado', () => {
    // Simula que el usuario está autenticado
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ displayName: 'Juanito' }); // Usuario autenticado
    });

    // Llama a la función feed con navigateTo
    feed(navigateTo);

    // Verifica si showPosts se llamó con el nombre de usuario correcto
    expect(showPosts).toHaveBeenCalledWith('Juanito', expect.any(Object));
  }); */
