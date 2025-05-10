import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesService } from './disciplines.service';

describe('DisciplinesService', () => {
  let service: DisciplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinesService],
    }).compile();

    service = module.get<DisciplinesService>(DisciplinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
