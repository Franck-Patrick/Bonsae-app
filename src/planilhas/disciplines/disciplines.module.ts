import { forwardRef, Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineEntity } from './entities/discipline.entity';
import { AcademicPeriodModule } from '../academic-period/academic-period.module';
import { Class, ClassSchema } from '../classes/schema/class.schema';
import { Discipline, DisciplineSchema } from './schema/discipline.schema';
import { Enrollment, EnrollmentSchema } from '../enrollment/schema/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Discipline.name, schema: DisciplineSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
    TypeOrmModule.forFeature([DisciplineEntity]),
    forwardRef(() => AcademicPeriodModule),
  ],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
  exports: [
    MongooseModule, 
    TypeOrmModule,
    DisciplinesService,
  ]
})
export class DisciplinesModule {}