import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { Class, ClassSchema } from './schema/class.schema';
import { ClassEntity } from './entities/class.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
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