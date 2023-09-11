import { expect } from '@jest/globals';
import { spyOn } from 'jest-mock';
import feed from '../src/components/feed';
import * as lib from '../src/lib';
import * as auth from '@firebase/auth';

jest.mock('@firebase/auth');

describe('feed', () => {
  it.only('debería realizar el envío del post correctamente', (done) => {
    spyOn(auth, 'getAuth').mockImplementation(() => ({
      currentUser: {
        displayName: 'Nicole',
      },
    }));
    spyOn(lib, 'addPost').mockImplementation(() => Promise.resolve());
    spyOn(lib, 'showPosts');
    const navigateTo = () => {};
    const feedContainer = feed(navigateTo);
    const textarea = feedContainer.querySelector('.text-area');
    const button = feedContainer.querySelector('.sendPost-button');
    textarea.value = 'Bienvenidos a TweetFit';
    const inputEvent = new Event('input', { bubbles: true });
    textarea.dispatchEvent(inputEvent);
    button.click();
    expect(textarea.value).toBe('Bienvenidos a TweetFit');
    expect(textarea).toBeTruthy();
    expect(button).toBeTruthy();
    setTimeout(() => {
      expect(lib.addPost).toHaveBeenCalled();
      expect(lib.showPosts).toHaveBeenCalled();
      expect(textarea.value).toBe('');
      done();
    }, 100);
  });
});
