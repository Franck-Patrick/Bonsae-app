import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoLetivoService } from './periodo-letivo.service';

describe('PeriodoLetivoService', () => {
  let service: PeriodoLetivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodoLetivoService],
    }).compile();

    service = module.get<PeriodoLetivoService>(PeriodoLetivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
