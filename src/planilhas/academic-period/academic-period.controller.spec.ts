import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodController } from './academic-period.controller';
import { AcademicPeriodService } from './academic-period.service';

describe('AcademicPeriodController', () => {
  let controller: AcademicPeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicPeriodController],
      providers: [AcademicPeriodService],
    }).compile();

    controller = module.get<AcademicPeriodController>(AcademicPeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
