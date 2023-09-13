import error from '../src/components/error';

describe('Testing error', () => {
  const errorElement = error();
  it('La función error crea un elemento h2 con el texto correcto', () => {
    const title = errorElement.querySelector('h2');
    expect(title.textContent).toBe('Error 404 page no found, please go home');
  });
});
