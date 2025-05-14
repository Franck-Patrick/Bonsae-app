import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ShiftEnum } from '../enum/shift.enum';

export class CreateClassDto {
  @IsString()
  'Número do Processo': string;

  @IsString()
  @IsNotEmpty()
  "Disciplina (Código)": string;

  @IsString()
  @IsOptional()
  "Turno": ShiftEnum;

  @IsString()
  @IsNotEmpty()
  "Turma": string;

  @IsString()
  @IsNotEmpty()
  "Código da turma": string;
}
