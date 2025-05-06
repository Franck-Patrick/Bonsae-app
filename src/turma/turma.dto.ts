import { ApiProperty } from '@nestjs/swagger';

export class TurmaDto {
  @ApiProperty({
    description: 'Nome da turma',
    example: 'Turma A',
  })
  nome: string;

  @ApiProperty({
    description: 'Número máximo de alunos da turma',
    example: 30,
  })
  numeroMaximoAlunos: number;

  @ApiProperty({
    description: 'ID do período letivo',
    example: '2025.1',
  })
  periodoLetivoId: string;
}
