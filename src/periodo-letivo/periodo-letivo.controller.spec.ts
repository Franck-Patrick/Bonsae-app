import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoLetivoController } from './periodo-letivo.controller';

describe('PeriodoLetivoController', () => {
  let controller: PeriodoLetivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoLetivoController],
    }).compile();

    controller = module.get<PeriodoLetivoController>(PeriodoLetivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
