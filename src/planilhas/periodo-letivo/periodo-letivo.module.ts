import { Module } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { PeriodoLetivoSchema } from './schema/periodo-letivo-schema';
import { PeriodoLetivoEntity } from './entities/periodo-letivo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Periodo_Letivo', schema: PeriodoLetivoSchema }]),
    TypeOrmModule.forFeature([PeriodoLetivoEntity]),
  ],
  controllers: [PeriodoLetivoController],
  providers: [PeriodoLetivoService],
})
export class PeriodoLetivoModule {}
