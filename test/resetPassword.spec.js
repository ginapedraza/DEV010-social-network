// import { sendPasswordResetEmail } from 'firebase/auth';
import resetPassword from '../src/components/resetPassword';

/* jest.mock('firebase/auth', () => (
  {
    sendPasswordResetEmail: jest.fn(),
  }
)); */

describe('Testing resetPassword function', () => {
  const navigateTo = jest.fn();
  const resetElement = resetPassword(navigateTo);
  const buttonReturn = resetElement.querySelector('.button-return');
  const buttonResetPass = resetElement.querySelector('.resetpass-button');
  // const inputResetPass = resetElement.querySelector('input-resetpass');

  it('should navigate to login when clicking button return', async () => {
    buttonReturn.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  }, 0);
  it('should navigate to login when reset password', async () => {
    buttonResetPass.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  }, 0);
  /*   it('should show an error message when user not found', (done) => {
    sendPasswordResetEmail.mockRejectedValue({ code: 'auth/user-not-found' });
    inputResetPass.value = 'test@email.com';
    buttonResetPass.click();
    process.nextTick(() => {
      const errorAlert = resetElement.querySelector('.error');
      expect(errorAlert.textContent).toBe('Correo electrónico no encontrado');
      done();
    });
  }); */
/*   it('should navigate to google', async () => {
    spyOn(yes, 'loginWithGoogle');
    await googleButton.click();
    expect(navigateTo).toHaveBeenCalledWith('/feed');
  }, 0); */
});
