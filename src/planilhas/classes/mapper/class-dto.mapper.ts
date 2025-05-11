import { ClassEntity } from "../entities/class.entity";
import { ClassDocument } from "../schema/class.schema";

export function classDtoMapper(raw: any) {
  return {
    disciplinaCodigo: raw['Disciplina (Código)'],
    turno: raw['Turno'],
    turma: raw['Turma'],
    codigoTurma: raw['Código da turma'],
  };
}

export function mapClassDocToEntity(doc: ClassDocument): ClassEntity {
  const entity = new ClassEntity();

  entity.name = doc.turma;
  entity.code = doc.codigoTurma;
  entity.shift = doc.turno;

  return entity;
}