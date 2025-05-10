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
  "ProcessID": string;

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