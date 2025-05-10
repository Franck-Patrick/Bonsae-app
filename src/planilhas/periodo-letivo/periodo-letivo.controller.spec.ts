import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { PeriodoLetivoService } from './periodo-letivo.service';

describe('PeriodoLetivoController', () => {
  let controller: PeriodoLetivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoLetivoController],
      providers: [PeriodoLetivoService],
    }).compile();

    controller = module.get<PeriodoLetivoController>(PeriodoLetivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
