import { Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discipline } from './schema/discipline.schema';
import mapDto from './mapper/mapDto';
import { AcademicPeriod, AcademicPeriodDocument } from '../academic-period/schema/academic-period.schema';
import { Class, ClassDocument } from '../classes/schema/class.schema';
import { Enrollment } from '../enrollment/schema/enrollment.schema';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel(AcademicPeriod.name) private readonly academicPeriodModel: Model<AcademicPeriodDocument>,
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(Discipline.name) private readonly disciplineModel: Model<Discipline>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<Enrollment>,
  ) {}

  private async findAcademicPeriod(academicPeriod: string): Promise<AcademicPeriodDocument> {
    const academicPeriodDoc = await this.academicPeriodModel
      .findOne({ academicPeriod: academicPeriod })
      .exec();
    if (!academicPeriodDoc) {
      throw new Error(`Periodo letivo not found for ${academicPeriod}`);
    }
    return academicPeriodDoc;
  }
  
  async createBulk(createDisciplineDtoList: CreateDisciplineDto[]) {
    const disciplineDocuments = await Promise.all(
      createDisciplineDtoList.map(async (disciplineDto) => {
        const academicPeriodDoc = await this.findAcademicPeriod(disciplineDto['Período Letivo (Identificação)']);

        if (!academicPeriodDoc) {
          throw new Error(`Periodo letivo not found for ${disciplineDto['Período Letivo (Identificação)']}`);
        }

        const discipline = mapDto(disciplineDto);
        const disciplineDoc = new this.disciplineModel(discipline);
        disciplineDoc.academicPeriodDoc = academicPeriodDoc.id;
        return disciplineDoc;
      })
    );

    return this.disciplineModel.insertMany(disciplineDocuments);
  }

  create(createDisciplineDto: CreateDisciplineDto) {
    return this.disciplineModel.create(createDisciplineDto);
  }

  findAll() {
    return this.disciplineModel.find().exec();
  }

  findOne(id: number) {
    return this.disciplineModel.findById(id).exec();
  }

  findByAcademicPeriod(academicPeriod: string) {
    return this.disciplineModel.find({ academicPeriod }).exec();
  }

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return this.disciplineModel.findByIdAndUpdate(id, updateDisciplineDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.disciplineModel.findByIdAndDelete(id).exec();
  }

  async removeByProcessNumber(processNumber: number) {
    const disciplines = await this.disciplineModel.find({ processNumber }).exec();

    if (disciplines.length === 0) {
      return disciplines;
    }

    const disciplineIds = disciplines.map(d => d._id);

    const classesResult = await this.classModel.deleteMany({
      disciplina: { $in: disciplineIds },
    }).exec();

    const enrollmentsResult = await this.enrollmentModel.deleteMany({
      disciplina: { $in: disciplineIds },
    }).exec();

    const disciplinesResult = await this.disciplineModel.deleteMany({
      _id: { $in: disciplineIds },
    }).exec();

    return {
      classesResult,
      disciplinesResult,
      enrollmentsResult,
    };
  }
}
