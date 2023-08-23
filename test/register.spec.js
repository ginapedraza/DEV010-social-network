/* describe('Testing register function', () => {
  test('it should call function createUser and create a new user', () => {
    jest.spyOn(auth, 'createUser').mockImplementation(() =>
    Promise.resolve({ currentUser: true, data: { code: 'mockData' } }));

    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(register(navigateTo));
    const sendEmailButton = DOM.querySelector('.sendEmail');

    DOM.querySelector('#inputEmail').value = 'test@email.com';
    DOM.querySelector('#inputPass').value = '123456';

    sendEmailButton.click();
    expect(auth.createUser).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(sendEmailVerification).toHaveBeenCalledTimes(1);
    }, 0);
  });
}); */
