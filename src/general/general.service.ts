import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { mapUserDocumentToEntity } from 'src/planilhas/user/mapper/user.mapper';
import { mapPeriodoLetivoDocumentToEntity } from 'src/planilhas/periodo-letivo/mapper/mapPeriodoLetivoDocToEntity';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PeriodoLetivoEntity } from 'src/planilhas/periodo-letivo/entities/periodo-letivo.entity';
import { PeriodoLetivo, PeriodoLetivoDocument } from 'src/planilhas/periodo-letivo/schema/periodo-letivo-schema';
import { UserEntity } from 'src/planilhas/user/entities/user.entity';
import { User, UserDocument } from 'src/planilhas/user/schema/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectModel(PeriodoLetivo.name) private periodoLetivoModel: Model<PeriodoLetivoDocument>,
    @InjectRepository(PeriodoLetivoEntity) private periodoLetivoRepository: Repository<PeriodoLetivoEntity>,
  ) {}
  
  async saveUser() {
    return this.userModel.find().exec().then((users) => {
      const entities = users.map((userDoc) => {
        return mapUserDocumentToEntity(userDoc);
      });
      return this.userRepository.save(entities);
    });
  }

  async savePeriodoLetivo(processId: string) {
    return this.periodoLetivoModel.find().where({ processId: processId }).exec().then((periodos) => {
      const entities = periodos.map((periodoDoc) => {
        return mapPeriodoLetivoDocumentToEntity(periodoDoc);
      });
      return this.periodoLetivoRepository.save(entities);
    });
  }

  create(createGeneralDto: CreateGeneralDto) {
    return 'This action adds a new general';
  }

  findAll() {
    return `This action returns all general`;
  }

  findOne(id: number) {
    return `This action returns a #${id} general`;
  }

  update(id: number, updateGeneralDto: UpdateGeneralDto) {
    return `This action updates a #${id} general`;
  }

  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
