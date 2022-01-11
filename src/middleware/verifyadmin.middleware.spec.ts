import { VerifyadminMiddleware } from './verifyadmin.middleware';

describe('VerifyadminMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyadminMiddleware()).toBeDefined();
  });
});
