import { Test, TestingModule } from '@nestjs/testing';
import { PaypointController } from './paypoint.controller';

describe('PaypointController', () => {
  let controller: PaypointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaypointController],
    }).compile();

    controller = module.get<PaypointController>(PaypointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
