import { Test, TestingModule } from '@nestjs/testing';
import { VoltService } from './volt.service';

describe('VoltService', () => {
  let service: VoltService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoltService],
    }).compile();

    service = module.get<VoltService>(VoltService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
