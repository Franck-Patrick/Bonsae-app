import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsDate,

} from 'class-validator';

export class CreatePeriodoLetivoDto {
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