import { Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DisciplineDocument } from '../disciplines/schema/discipline.schema';
import { ClassDocument } from './schema/class.schema';
import { classDtoMapper } from './mapper/class-dto.mapper';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel('Discipline') private disciplineModel: Model<DisciplineDocument>,
    @InjectModel('Class') private classModel: Model<ClassDocument>
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

  removeByProcessNumber(processNumber: number) {
    return this.classModel.deleteMany({ processNumber }).exec();
  }
}
