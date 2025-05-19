import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  'Número do Processo': string;

  @IsString()
  'Perfil': string;

  @IsString()
  @IsOptional()
  'Subperfil': string;

  @IsString()
  'Nome': string;

  @IsString()
  @IsOptional()
  'Nº da OAB': string;

  @IsString()
  @IsOptional()
  'Seccional (UF OAB)': string;

  @IsString()
  'E-mail': string;

  @IsString()
  @IsOptional()
  'Matrícula (IES)': string;

  @IsString()
  @IsOptional()
  'Telefone': string;

  @IsString()
  'CPF': string;

  @IsString()
  'Senha': string;

  @IsString()
  @IsOptional()
  'Período Curricular': string;

  @IsString()
  @IsOptional()
  'Observações': string;
}