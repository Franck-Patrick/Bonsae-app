import {
  IsEnum,
  IsString,
  IsOptional,
  IsEmail,
  IsIn,
  Max,
} from 'class-validator';
import { UserProfile } from '../enums/user-profile.enum';

// DTO do usuário com os dados da planilha e padrões do banco
export class CreateUserDto {
  @IsEnum(UserProfile)
  profileId: UserProfile;

  @IsString()
  @IsOptional()
  subprofile?: string;

  @IsString()
  @Max(100)
  name: string;

  @IsString()
  @IsOptional()
  oab?: string;

  @IsString()
  @IsOptional()
  @Max(2)
  oabUf?: string;

  @IsEmail()
  @Max(100)
  email: string;

  @IsString()
  @IsOptional()
  @Max(50)
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  @Max(20)
  telephone?: string;

  @IsString()
  @Max(14)
  cpf: string;

  @IsString()
  @Max(255)
  password: string;

  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  @IsOptional()
  periodId?: number;

  @IsString()
  @IsOptional()
  observations?: string;
}