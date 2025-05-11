import { DisciplineDocument } from '../schema/discipline.schema';
import { DisciplineEntity } from '../entities/discipline.entity';

export function mapDisciplineDocumentToEntity(doc: DisciplineDocument): DisciplineEntity {
  const entity = new DisciplineEntity();

  entity.name = doc.name ?? '';
  entity.code = doc.code;
  entity.startDate = doc.startDate;
  entity.endDate = doc.endDate;
  entity.category = doc.category;
  entity.period = doc.curricularPeriod ?? '';
  entity.campus = doc.campus;

  return entity;
}