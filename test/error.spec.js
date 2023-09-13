/* eslint-disable no-unused-vars */
import error from '../src/components/error';

describe('error', () => {
  const errorElement = error();
  it('error must be a function', () => {
    expect(typeof error).toBe('function');
  });
});
