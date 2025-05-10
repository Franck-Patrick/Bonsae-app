import { Injectable } from '@nestjs/common';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';

@Injectable()
export class PeriodoLetivoService {
  create(createPeriodoLetivoDto: CreatePeriodoLetivoDto) {
    return 'This action adds a new periodoLetivo';
  }

  findAll() {
    return `This action returns all periodoLetivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} periodoLetivo`;
  }

  update(id: number, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto) {
    return `This action updates a #${id} periodoLetivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} periodoLetivo`;
  }
}
