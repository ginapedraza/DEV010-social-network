import error from '../src/components/error';

describe('Testing error function', () => {
  const errorElement = error();
  const title = errorElement.querySelector('h2');
  it('should return error', () => {
    expect(title.textContent).toBe('Error 404 page no found, please go home');
  });
});
