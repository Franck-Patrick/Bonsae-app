import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discipline, DisciplineDocument } from '../disciplines/schema/discipline.schema';
import { Class, ClassDocument } from './schema/class.schema';
import { classDtoMapper } from './mapper/class-dto.mapper';
import { Enrollment } from '../enrollment/schema/enrollment.schema';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<Enrollment>,
  ) {}

  private async findDiscipline(disciplineId: string): Promise<DisciplineDocument> {
    const disciplineDoc = await this.disciplineModel
      .findOne({ code: disciplineId })
      .exec();
    if (!disciplineDoc) {
      throw new Error(`Discipline not found for ${disciplineId}`);
    }
    return disciplineDoc;
  }

  async createBulk(createClassDtoList: CreateClassDto[]) {
    const classDocuments = await Promise.all(
      createClassDtoList.map(async (dto) => {
        const disciplineCode = dto["Disciplina (Código)"];
        const discipline = await this.findDiscipline(disciplineCode);

        if (!discipline) {
          throw new Error(`Discipline not found: ${disciplineCode}`);
        }

        const mapped = classDtoMapper(dto);

        console.log('Mapped DTO:', mapped);
        console.log('Discipline:', discipline);
        const classDoc = new this.classModel({
          ...mapped,
          disciplina: discipline._id,
          disciplinaCodigo: disciplineCode
        });

        return classDoc;
      })
    );

    return this.classModel.insertMany(classDocuments);
  }

  create(createClassDto: CreateClassDto) {
    return this.classModel.create(createClassDto);
  }

  findAll() {
    return this.classModel.find().exec();
  }

  findOne(id: number) {
    return this.classModel.findById(id).exec();
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.classModel.findByIdAndDelete(id).exec();
  }

  async removeByProcessNumber(processNumber: number) {
    const classes = await this.disciplineModel.find({ processNumber }).exec();

    if (classes.length === 0) {
      return classes;
    }

    const classIds = classes.map(d => d._id);

    const enrollmentsResult = await this.enrollmentModel.deleteMany({
      disciplina: { $in: classIds },
    }).exec();

    const classesResult = await this.classModel.deleteMany({
      _id: { $in: classIds },
    }).exec();

    return {
      classesResult,
      enrollmentsResult,
    };
  }
}
