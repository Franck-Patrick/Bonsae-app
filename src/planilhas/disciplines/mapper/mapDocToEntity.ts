import { PeriodoLetivoEntity } from 'src/planilhas/periodo-letivo/entities/periodo-letivo.entity';
import { Discipline, DisciplineDocument } from '../schema/discipline.schema';
import { DisciplineEntity } from '../entities/discipline.entity';
import { PeriodoLetivoDocument } from 'src/planilhas/periodo-letivo/schema/periodo-letivo-schema';

export function mapDisciplineDocumentToEntity(doc: DisciplineDocument): DisciplineEntity {
    const entity = new DisciplineEntity();

    entity.name = doc['Disciplina'] ?? '';
    entity.code = doc['Código da Disciplina'];
    entity.startDate = doc['Data Inicial'];
    entity.endDate = doc['Data Final'];
    entity.category = doc['Categoria'];
    entity.period = doc['Período Curricular'] ?? '';
    entity.campus = doc['Campus'];
    entity.integration = doc['Código da Disciplina'];
    entity.course = doc['Disciplina'] ?? '';
    entity.active = true;
    entity.isExceptional = false;

    return entity;
}