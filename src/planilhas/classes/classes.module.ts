import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassEntity } from './entities/class.entity';
import { Class, ClassSchema } from './schema/class.schema';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { Enrollment, EnrollmentSchema } from '../enrollment/schema/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
    TypeOrmModule.forFeature([ClassEntity]),
    DisciplinesModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [
    MongooseModule, 
    TypeOrmModule
  ]
})
export class ClassesModule {}