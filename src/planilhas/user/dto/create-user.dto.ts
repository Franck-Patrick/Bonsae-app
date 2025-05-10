import {
  IsEnum,
  IsString,
  IsOptional,
  IsEmail,
  IsIn,
  Max,
} from 'class-validator';
import { UserProfile } from '../enums/user-profile.enum';

export class CreateUserDto {
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