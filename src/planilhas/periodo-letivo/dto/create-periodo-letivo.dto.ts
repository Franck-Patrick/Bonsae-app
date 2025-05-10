import {
    IsString,
    IsNotEmpty,
    MaxLength,
    Matches,

  } from 'class-validator';
  
  export class CreatePeriodoLetivoDto {
    @IsString({ message: 'A identificação deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "Identificação" não pode estar vazio.' })
    @MaxLength(20, { message: 'A "Identificação" deve ter no máximo 20 caracteres.' }) 
    periodoLetivo: string;
  
    
  
    @IsString({ message: 'A data inicial deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "Data Inicial" não pode estar vazio.' })
    @Matches(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, {
      message: 'A "Data Inicial" deve estar no formato D/M/AAAA ou DD/MM/AAAA (ex: 1/1/2025 ou 01/01/2025).',
    })
    @MaxLength(10, { message: 'A "Data Inicial" deve ter no máximo 10 caracteres.'})
    dataInicial: string; 
  
    @IsString({ message: 'A data final deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "Data Final" não pode estar vazio.' })
    @Matches(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, {
      message: 'A "Data Final" deve estar no formato D/M/AAAA ou DD/MM/AAAA (ex: 1/7/2025 ou 01/07/2025).',
    })
    @MaxLength(10, { message: 'A "Data Final" deve ter no máximo 10 caracteres.'})
    dataFinal: string; 
  
  }