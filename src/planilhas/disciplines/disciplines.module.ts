import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineEntity } from './entities/discipline.entity';
import { Discipline, DisciplineSchema } from './schema/discipline.schema';
import { PeriodoLetivoModule } from '../periodo-letivo/periodo-letivo.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Discipline.name, schema: DisciplineSchema }]),
    TypeOrmModule.forFeature([DisciplineEntity]),
    PeriodoLetivoModule,
  ],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
  exports: [
    MongooseModule, 
    TypeOrmModule
  ]
})
export class DisciplinesModule {}