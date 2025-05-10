import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineEntity } from './entities/discipline.entity';
import { DisciplineSchema } from './schema/discipline-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Discipline', schema: DisciplineSchema }]),
    TypeOrmModule.forFeature([DisciplineEntity]),
  ],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
})
export class DisciplinesModule {}
