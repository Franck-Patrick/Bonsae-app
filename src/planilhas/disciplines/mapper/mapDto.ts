export default function mapDto(dto: any): any {
    return {
        academicPeriod: dto['Período Letivo (Identificação)'],
        name: dto['Disciplina'],
        code: dto['Código da Disciplina'],
        startDate: new Date(dto['Data Inicial']),
        endDate: new Date(dto['Data Final']),
        category: dto['Categoria'],
        curricularPeriod: dto['Período Curricular'],
        state: dto['Estado'],
        campus: dto['Campus'],
    };
}