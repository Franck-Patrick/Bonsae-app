import { Module } from '@nestjs/common';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { DatabaseModule } from '../database/database.module'; // Importe o DatabaseModule

@Module({
  imports: [DatabaseModule], // Adicione o DatabaseModule aqui
  controllers: [PeriodoLetivoController],
  providers: [PeriodoLetivoService],
})
export class PeriodoLetivoModule {}
