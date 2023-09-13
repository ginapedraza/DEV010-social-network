import noFeed from '../src/components/noFeed';

describe('Testing noFeed', () => {
  const navigateTo = jest.fn();
  const mailVerificacionElement = noFeed(navigateTo);

  const buttonhome = mailVerificacionElement.querySelector('.button-home-nofeed');
  it('should navigate to login', async () => {
    buttonhome.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  }, 0);
});
