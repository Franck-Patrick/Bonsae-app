import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    'Disciplina (código)': string;

    @IsString()
    @IsNotEmpty()
    'Código da turma': string;
    
    @IsString()
    @IsNotEmpty()
    'Número do Processo': string;

    @IsEmail()
    @IsNotEmpty()
    'Matrícula (IES) ou e-mail do aluno': string;
}

export class CreateProfessorDto {
    @IsString()
    @IsNotEmpty()
    'Disciplina (código)': string;

    @IsString()
    @IsNotEmpty()
    'Código da turma': string;

    @IsString()
    @IsNotEmpty()
    'Número do Processo': string;

    @IsEmail()
    @IsNotEmpty()
    'Professores(as) responsavel(eis) matricula ou e-mail do aluno': string;
}

export class CreateEnrollmentDto {
    @IsString()
    @IsNotEmpty()
    disciplina: string;

    @IsString()
    @IsNotEmpty()
    codigoTurma: string;

    @IsString()
    @IsNotEmpty()
    processNumber: string;

    @IsOptional()
    @IsString()
    matricula: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsNotEmpty()
    isProfessor: boolean;
}