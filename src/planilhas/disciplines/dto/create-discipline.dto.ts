import { IsEnum, IsOptional, IsString } from "class-validator";

// incompleto
export class CreateDisciplineDto {
    @IsString()
    periodId: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    code: string;

    @IsString()
    startDate: Date;

    @IsString()
    endDate: Date;

    @IsString()
    @IsEnum(['CURSO', 'NPJ', 'PROJETOS_EXTENSIONISTAS', 'TCC'])
    category: 'CURSO' | 'NPJ' | 'PROJETOS_EXTENSIONISTAS' | 'TCC';
}
