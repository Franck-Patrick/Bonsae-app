import { UserProfile } from '../enums/user-profile.enum';

export function userDtoMapper(raw: any) {
  return {
    processNumber: raw['Número do Processo'],
    profileId: raw['Perfil'] as UserProfile,
    subprofile: raw['Subperfil'] || '',
    name: raw['Nome'],
    oab: raw['Nº da OAB'] || '',
    oabUf: raw['Seccional (UF OAB)'] || '',
    email: raw['E-mail'],
    registrationNumber: raw['Matrícula (IES)'] || '',
    telephone: raw['Telefone'] || '',
    cpf: raw['CPF'],
    password: raw['Senha'],
    periodId: parseInt(raw['Período Curricular']) || undefined,
    observations: raw['Observações'] || '',
  };
}