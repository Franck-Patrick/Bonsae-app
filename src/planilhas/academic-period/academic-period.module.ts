import { forwardRef, Module } from '@nestjs/common';
import { AcademicPeriodService } from './academic-period.service';
import { AcademicPeriodController } from './academic-period.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicPeriod, AcademicPeriodSchema } from './schema/academic-period.schema';
import { AcademicPeriodEntity } from './entity/academic-period.entity';
import { DisciplinesModule } from '../disciplines/disciplines.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcademicPeriod.name, schema: AcademicPeriodSchema },
    ]),
    TypeOrmModule.forFeature([AcademicPeriodEntity]),
    forwardRef(() => DisciplinesModule),
  ],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService],
  exports: [
    MongooseModule, 
    TypeOrmModule
  ]
})
export class AcademicPeriodModule {}
