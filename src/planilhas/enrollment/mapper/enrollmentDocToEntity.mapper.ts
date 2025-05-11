import { EnrollmentEntity } from "../entities/enrollment.entity";
import { EnrollmentDocument } from "../schema/enrollment.schema";

export default function mapEnrollmentDocToEntity(doc: EnrollmentDocument) {
    const entity = new EnrollmentEntity();

    entity.professor = doc.isProfessor;

    return entity;
}