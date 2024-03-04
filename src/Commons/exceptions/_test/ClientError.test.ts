import ClientError from '../ClientError';

describe('ClientError', () => {
  it('should throw error when instantiate abstract class', () => {
    expect(() => new ClientError('Error')).toThrow(
      'cannot instantiate abstract class',
    );
  });
});
