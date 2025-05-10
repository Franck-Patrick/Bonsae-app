import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';

@Controller('periodo-letivo')
export class PeriodoLetivoController {
  constructor(private readonly periodoLetivoService: PeriodoLetivoService) {}

  @Post('sendToMysql/:processId')
  sendToMysql(@Param('processId') processId: string) {
    return this.periodoLetivoService.saveToMysql(processId);
  }

  @Post('bulk')
  createBulk(@Body() createPeriodoLetivoDtoList: CreatePeriodoLetivoDto[]) {
    return this.periodoLetivoService.createBulk(createPeriodoLetivoDtoList);
  }

  @Post('findAllByProcessId/:processId')
  findAllByProcessId(@Param('processId') processId: string) {
    return this.periodoLetivoService.findAllByProcessId(processId);
  }

  @Post()
  create(@Body() createPeriodoLetivoDto: CreatePeriodoLetivoDto) {
    return this.periodoLetivoService.create(createPeriodoLetivoDto);
  }

  @Get()
  findAll() {
    return this.periodoLetivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodoLetivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodoLetivoDto: UpdatePeriodoLetivoDto) {
    return this.periodoLetivoService.update(+id, updatePeriodoLetivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodoLetivoService.remove(+id);
  }
}
