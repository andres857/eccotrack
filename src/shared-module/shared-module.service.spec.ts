import { Test, TestingModule } from '@nestjs/testing';
import { SharedModuleService } from './shared-module.service';

describe('SharedModuleService', () => {
  let service: SharedModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedModuleService],
    }).compile();

    service = module.get<SharedModuleService>(SharedModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
