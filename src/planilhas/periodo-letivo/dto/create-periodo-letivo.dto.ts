import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,

} from 'class-validator';

export class CreatePeriodoLetivoDto {
  @IsString()
  @IsNotEmpty()
  processId: string;

  @IsString()
  @IsNotEmpty()
  academicPeriod: string;

  @IsString()
  @IsNotEmpty()
  dataInicial: string; 

  @IsString()
  @IsNotEmpty()
  dataFinal: string; 
}