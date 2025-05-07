export enum UserProfile {
    ALUNO = 'Aluno(a)',
    PROFESSOR = 'Professor(a)',
    COORDENADOR = 'Coordenador(a)',
    SECRETARIO = 'Secretário(a)',
    ESTAGIARIO = 'Estagiário(a)',
    ADVOGADO = 'Advogado(a)',
}

export const UserProfileMap: Record<UserProfile, number> = {
    [UserProfile.ALUNO]: 1,
    [UserProfile.PROFESSOR]: 2,
    [UserProfile.COORDENADOR]: 3,
    [UserProfile.SECRETARIO]: 4,
    [UserProfile.ESTAGIARIO]: 5,
    [UserProfile.ADVOGADO]: 6
};