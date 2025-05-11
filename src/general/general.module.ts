import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { UserModule } from 'src/planilhas/user/user.module';
import { DisciplinesModule } from 'src/planilhas/disciplines/disciplines.module';
import { ClassesModule } from 'src/planilhas/classes/classes.module';
import { EnrollmentModule } from 'src/planilhas/enrollment/enrollment.module';
import { AcademicPeriodModule } from 'src/planilhas/academic-period/academic-period.module';

@Module({
  imports: [
    UserModule,
    AcademicPeriodModule,
    DisciplinesModule,
    ClassesModule,
    EnrollmentModule
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}