import { Test, TestingModule } from '@nestjs/testing';
import { ChatcrudService } from './chatcrud.service';

describe('ChatcrudService', () => {
  let service: ChatcrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatcrudService],
    }).compile();

    service = module.get<ChatcrudService>(ChatcrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
