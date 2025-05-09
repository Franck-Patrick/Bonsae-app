import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';

@Controller('periodo-letivo')
export class PeriodoLetivoController {
  constructor(private readonly periodoLetivoService: PeriodoLetivoService) {}

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
