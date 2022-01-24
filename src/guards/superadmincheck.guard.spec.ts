import { SuperadmincheckGuard } from './superadmincheck.guard';

describe('SuperadmincheckGuard', () => {
  it('should be defined', () => {
    expect(new SuperadmincheckGuard()).toBeDefined();
  });
});
