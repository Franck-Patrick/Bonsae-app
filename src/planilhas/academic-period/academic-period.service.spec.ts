import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodService } from './academic-period.service';

describe('AcademicPeriodService', () => {
  let service: AcademicPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicPeriodService],
    }).compile();

    service = module.get<AcademicPeriodService>(AcademicPeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
