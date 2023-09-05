import {
  addDoc, collection, Timestamp,
} from 'firebase/firestore';
import { db } from '../src/firebase.js';
import feed from '../src/components/feed.js';
import { addPost } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => (
  {
    showPosts: jest.fn(),
    // => Promise.resolve({ response: { test: 'test' } })),
    addPost: jest.fn(), // => objectAuth),
    // createUserWithEmailAndPassword: jest.fn(),
    auth: jest.fn(),

  }
));

describe('Testing feed function', () => {
  // const navigateTo = jest.fn();
  // const feedElement = feed(navigateTo);

  // const sendPostButton = feedElement.querySelector('.sendPost-button');
  // const textArea = feedElement.querySelector('.text-area');
  // const post = textArea.value;
  // const name = auth.currentUser.displayName;
  // const date = Timestamp.now();

  /* it('should call showPosts when clicking the sendPostButton', async () => {
    sendPostButton.click();
    await Promise.resolve();
    expect(addPost).toHaveBeenCalledTimes(1);
  }); */

  it('should add a post successfully', async () => {
    const collectionMock = jest.fn();
    collection.mockReturnValue(collectionMock);

    const name = 'Maria';
    const post = 'Hola a todas!';
    const date = Timestamp.now();

    await addPost(name, post, date);

    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(addDoc).toHaveBeenCalledWith(collectionMock, {
      name,
      post,
      date,
    });
  });
});
