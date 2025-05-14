import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsString()
  'Número do Processo': string;

  @IsString()
  'Período Letivo (Identificação)': string;

  @IsString()
  @IsOptional()
  'Disciplina': string;

  @IsString()
  'Código da Disciplina': string;

  @IsDateString()
  'Data Inicial': string;
  
  @IsDateString()
  'Data Final': string;

  @IsEnum(['Curso', 'NPJ', 'Projetos Extensionistas', 'TCC'])
  'Categoria': 'Curso' | 'NPJ' | 'Projetos Extensionistas' | 'TCC';

  @IsString()
  @IsOptional()
  'Período Curricular': string;

  @IsString()
  'Estado': string;

  @IsString()
  'Campus': string;
}