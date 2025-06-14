import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post('bulk')
  createBulk(@Body() createDisciplineDtoList: CreateDisciplineDto[]) {
    return this.disciplinesService.createBulk(createDisciplineDtoList);
  }

  @Post()
  create(@Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.create(createDisciplineDto);
  }

  @Get()
  findAll() {
    return this.disciplinesService.findAll();
  }

  @Get('get-one/:processNumber')
  async findAllByProcessId(@Param('processNumber') processNumber: string) {
    if (!processNumber || processNumber.trim() === '' || processNumber === 'NaN') {
      throw new BadRequestException('Invalid process number provided.');
    }

    return this.disciplinesService.findAllByProcessId(processNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinesService.findOne(+id);
  }
  
  @Get('academic-period/:academicPeriod')
  findByAcademicPeriod(@Param('academicPeriod') academicPeriod: string) {
    return this.disciplinesService.findByAcademicPeriod(academicPeriod);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisciplineDto: UpdateDisciplineDto) {
    return this.disciplinesService.update(+id, updateDisciplineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinesService.remove(id);
  }

  @Delete('rollback/:processNumber')
  removeByProcess(@Param('processNumber') processNumber: string) {
    return this.disciplinesService.removeByProcessNumber(+processNumber);
  }
}
