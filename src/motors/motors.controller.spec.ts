import { Test, TestingModule } from '@nestjs/testing';
import { MotorsController } from './motors.controller';

describe('Motors Controller', () => {
  let controller: MotorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorsController],
    }).compile();

    controller = module.get<MotorsController>(MotorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
