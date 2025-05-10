import { PeriodoLetivoEntity } from "../entities/periodo-letivo.entity";
import { PeriodoLetivo, PeriodoLetivoDocument } from "../schema/periodo-letivo-schema";

export function mapPeriodoLetivoDocumentToEntity(doc: PeriodoLetivoDocument): PeriodoLetivoEntity {
    const entity = new PeriodoLetivoEntity();

    entity.code = doc.academicPeriod;
    entity.startDate = doc.startDate;
    entity.endDate = doc.endDate;

    return entity;
}