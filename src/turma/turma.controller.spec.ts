import { Test, TestingModule } from '@nestjs/testing';
import { TurmaController } from './turma.controller';

describe('TurmaController', () => {
  let controller: TurmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmaController],
    }).compile();

    controller = module.get<TurmaController>(TurmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
