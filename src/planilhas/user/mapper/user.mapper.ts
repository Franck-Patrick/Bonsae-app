import { UserEntity } from "../entities/user.entity";
import { UserProfileMap } from "../enums/user-profile.enum";
import { UserDocument } from "../schema/user.schema";

export function mapUserDocumentToEntity(doc: UserDocument): UserEntity {
    const entity = new UserEntity();
  
    entity.profileId = UserProfileMap[doc.profileId];
    entity.name = doc.name;
    entity.registrationNumber = doc.registrationNumber ?? '';
    entity.email = doc.email;
    entity.telephone = doc.telephone ?? '';
    entity.password = doc.password;
    entity.cpf = doc.cpf;
    entity.periodId = doc.periodId ?? 0;
    entity.oab = doc.oab ?? '';
    entity.oabUf = doc.oabUf ?? '';
    entity.observations = doc.observations ?? '';
  
    return entity;
}