import { CreateStudentDto, CreateProfessorDto, CreateEnrollmentDto } from "../dto/create-enrollment.dto";

export function mapToEnrollmentDto(
  input: CreateStudentDto | CreateProfessorDto
): CreateEnrollmentDto {
  const isProfessor = 'Professores(as) responsavel(eis) matricula ou e-mail do aluno' in input;

  const identifier = isProfessor
    ? input['Professores(as) responsavel(eis) matricula ou e-mail do aluno']
    : input['Matrícula (IES) ou e-mail do aluno'];

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  console.log(input);

  const enrollment: CreateEnrollmentDto = {
    disciplina: input['Disciplina (código)'],
    codigoTurma: input['Código da turma'],
    processNumber: input['Número do Processo'],
    isProfessor,
    matricula: isEmail ? '' : identifier,
    email: isEmail ? identifier : '',
  };

  return enrollment;
}