import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,

} from 'class-validator';
import { Status } from '../enum/Status';

export class CreateAcademicPeriodDto {
  @IsString()
  @IsNotEmpty()
  processId: string;

  @IsString()
  @IsNotEmpty()
  academicPeriod: string;

  @IsDate()
  @IsNotEmpty()
  startDate: string; 

  @IsDate()
  @IsNotEmpty()
  endDate: string;

  @IsEnum(Status)
  @IsNotEmpty()
  currentStep: Status;
}