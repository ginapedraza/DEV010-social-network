import { collection } from 'firebase/firestore';
// import { db } from '../src/firebase.js';
// import { onAuthStateChanged } from 'firebase/auth';
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
  getDocs: jest.fn(() => 'postDelUsuario'),
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

  it('Feed Debería ser una función', () => {
    expect(typeof feed).toBe('function');
  });

  it('should log out when clicking button buttonLogout', async () => {
    buttonLogout.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(logOut).toHaveBeenCalledTimes(1);
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
    // textArea.oninput();
    expect(sendPostButton.disabled).toBe(true);
  });
});

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
