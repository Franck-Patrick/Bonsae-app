import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineEntity } from './entities/discipline.entity';
import { AcademicPeriodModule } from '../academic-period/academic-period.module';
import { Class, ClassSchema } from '../classes/schema/class.schema';
import { Discipline, DisciplineSchema } from './schema/discipline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Discipline.name, schema: DisciplineSchema },
    ]),
    TypeOrmModule.forFeature([DisciplineEntity]),
    AcademicPeriodModule,
  ],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
  exports: [
    MongooseModule, 
    TypeOrmModule
  ]
})
export class DisciplinesModule {}