import { Inject, Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { PeriodoLetivo, PeriodoLetivoDocument } from '../periodo-letivo/schema/periodo-letivo-schema';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PeriodoLetivoEntity } from '../periodo-letivo/entities/periodo-letivo.entity';
import { Repository } from 'typeorm';
import { Discipline, DisciplineDocument } from './schema/discipline.schema';
import { DisciplineEntity } from './entities/discipline.entity';
import mapDto from './mapper/mapDto';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel(PeriodoLetivo.name) private readonly periodoLetivoModel: Model<PeriodoLetivoDocument>,
    @InjectModel(Discipline.name) private readonly disciplineModel: Model<Discipline>,
    @InjectRepository(DisciplineEntity) private readonly disciplineRepository: Repository<DisciplineEntity>,
    @InjectRepository(PeriodoLetivoEntity) private readonly periodoLetivoRepository: Repository<PeriodoLetivoEntity>,
  ) {}

  private async findPeriodoLetivo(academicPeriod: string): Promise<PeriodoLetivoDocument> {
    const periodoLetivoDoc = await this.periodoLetivoModel
      .findOne({ academicPeriod: academicPeriod })
      .exec();
    if (!periodoLetivoDoc) {
      throw new Error(`Periodo letivo not found for ${academicPeriod}`);
    }
    return periodoLetivoDoc;
  }
  
  async createBulk(createDisciplineDtoList: CreateDisciplineDto[]) {
    const disciplineDocuments = await Promise.all(
      createDisciplineDtoList.map(async (disciplineDto) => {
        const periodoLetivoDoc = await this.findPeriodoLetivo(disciplineDto['Período Letivo (Identificação)']);

        if (!periodoLetivoDoc) {
          throw new Error(`Periodo letivo not found for ${disciplineDto['Período Letivo (Identificação)']}`);
        }

        const discipline = mapDto(disciplineDto);
        const disciplineDoc = new this.disciplineModel(discipline);
        disciplineDoc['periodoLetivo'] = periodoLetivoDoc.id;
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
    return this.disciplineModel.findById(id).exec;
  }

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return this.disciplineModel.findByIdAndUpdate(id, updateDisciplineDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.disciplineModel.findByIdAndDelete(id).exec();
  }
}
