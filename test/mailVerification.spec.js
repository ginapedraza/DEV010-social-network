import mailVerificacion from '../src/components/mailVerification';

describe('Testing mailVerificacion', () => {
  const navigateTo = jest.fn();
  const mailVerificacionElement = mailVerificacion(navigateTo);

  const buttonLogin = mailVerificacionElement.querySelector('.button-home-nofeed');
  it('should navigate to login', async () => {
    buttonLogin.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  }, 0);
});
