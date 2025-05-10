import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  "Disciplina (Código)": string;

  @IsString()
  @IsNotEmpty()
  "Turno": string;

  @IsString()
  @IsNotEmpty()
  "Turma": string;

  @IsString()
  @IsNotEmpty()
  "Código da turma": string;
}
