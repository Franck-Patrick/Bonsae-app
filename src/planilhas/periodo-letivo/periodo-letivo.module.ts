import { Module } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoController } from './periodo-letivo.controller';

@Module({
  controllers: [PeriodoLetivoController],
  providers: [PeriodoLetivoService],
})
export class PeriodoLetivoModule {}
