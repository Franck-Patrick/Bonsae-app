export function classDtoMapper(raw: any) {
  return {
    disciplinaCodigo: raw['Disciplina (Código)'],
    turno: raw['Turno'],
    turma: raw['Turma'],
    codigoTurma: raw['Código da turma'],
  };
}