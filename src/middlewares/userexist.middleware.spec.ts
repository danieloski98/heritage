import { UserexistMiddleware } from './userexist.middleware';

describe('UserexistMiddleware', () => {
  it('should be defined', () => {
    expect(new UserexistMiddleware()).toBeDefined();
  });
});
