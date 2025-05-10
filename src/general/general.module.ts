import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { UserModule } from 'src/planilhas/user/user.module';
import { PeriodoLetivoModule } from 'src/planilhas/periodo-letivo/periodo-letivo.module';
import { DisciplinesModule } from 'src/planilhas/disciplines/disciplines.module';

@Module({
  imports: [
    UserModule,
    PeriodoLetivoModule,
    DisciplinesModule,
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}