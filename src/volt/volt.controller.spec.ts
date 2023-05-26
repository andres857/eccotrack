import { Test, TestingModule } from '@nestjs/testing';
import { VoltController } from './volt.controller';

describe('VoltController', () => {
  let controller: VoltController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoltController],
    }).compile();

    controller = module.get<VoltController>(VoltController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
