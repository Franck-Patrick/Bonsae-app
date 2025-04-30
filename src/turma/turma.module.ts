import { Module } from '@nestjs/common';
import { TurmaController } from './turma.controller';
import { TurmaService } from './turma.service';
import { DatabaseModule } from '../database/database.module'; // Importe o DatabaseModule

@Module({
  imports: [DatabaseModule], // Adicione o DatabaseModule aqui
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}