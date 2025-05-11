import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsDate,

} from 'class-validator';

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
}