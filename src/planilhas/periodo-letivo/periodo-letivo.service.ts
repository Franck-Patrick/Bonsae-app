import { Injectable } from '@nestjs/common';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schema/periodo-letivo-schema';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodoLetivoEntity } from './entities/periodo-letivo.entity';
import { Repository } from 'typeorm';
import { Document, Model } from 'mongoose';
import { mapPeriodoLetivoDocumentToEntity } from './mapper/mapPeriodoLetivoDocToEntity';

@Injectable()
export class PeriodoLetivoService {
  constructor(
    @InjectModel(PeriodoLetivo.name) private periodoLetivoModel: Model<PeriodoLetivoDocument>,
    @InjectRepository(PeriodoLetivoEntity) private periodoLetivoRepository: Repository<PeriodoLetivoEntity>,
  ) {}

  async saveToMysql(processId: string) {
    return this.periodoLetivoModel.find().where({ processId: processId }).exec().then((periodos) => {
      const mysqlPeriodos = periodos.map((periodoDoc) => {
        return mapPeriodoLetivoDocumentToEntity(periodoDoc);
      });
      return this.periodoLetivoRepository.save(mysqlPeriodos);
    });
  }

  createBulk(createPeriodoLetivoDtoList: CreatePeriodoLetivoDto[]) {
    const periodoLetivoDocuments = createPeriodoLetivoDtoList.map((periodoLetivoDto) => new this.periodoLetivoModel(periodoLetivoDto));
    return this.periodoLetivoModel.insertMany(periodoLetivoDocuments);
  }

  create(createPeriodoLetivoDto: CreatePeriodoLetivoDto) {
    return this.periodoLetivoModel.create(createPeriodoLetivoDto);
  }

  findAll() {
    return this.periodoLetivoModel.find().exec();
  }

  findAllByProcessId(processId: string) {
    return this.periodoLetivoModel.find().where({processId: processId}).exec();
  }

  findOne(id: number) {
    return this.periodoLetivoModel.findById(id).exec();
  }

  update(id: number, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto) {
    return this.periodoLetivoModel.findByIdAndUpdate(id, updatePeriodoLetivoDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.periodoLetivoModel.findByIdAndDelete(id).exec();
  }
}