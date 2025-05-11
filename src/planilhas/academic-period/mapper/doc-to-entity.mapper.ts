import { AcademicPeriodEntity } from "../entity/academic-period.entity";
import { AcademicPeriodDocument } from "../schema/academic-period.schema";

export function mapAcademicPeriodDocumentToEntity(doc: AcademicPeriodDocument): AcademicPeriodEntity {
    const entity = new AcademicPeriodEntity();

    entity.academicPeriod = doc.academicPeriod;
    entity.startDate = doc.startDate;
    entity.endDate = doc.endDate;

    return entity;
}