import { VerifyuserMiddleware } from './verifyuser.middleware';

describe('VerifyuserMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyuserMiddleware()).toBeDefined();
  });
});
