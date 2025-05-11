import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AcademicPeriodService } from './academic-period.service';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';
import { UpdateAcademicPeriodDto } from './dto/update-periodo-letivo.dto';

@Controller('academic-period')
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}
  
  @Post('bulk')
  createBulk(@Body() createAcademicPeriodDtoList: CreateAcademicPeriodDto[]) {
    return this.academicPeriodService.createBulk(createAcademicPeriodDtoList);
  }

  @Post('findAllByProcessId/:processId')
  findAllByProcessId(@Param('processId') processId: string) {
    return this.academicPeriodService.findAllByProcessId(processId);
  }

  @Post()
  create(@Body() createAcademicPeriodDto: CreateAcademicPeriodDto) {
    return this.academicPeriodService.create(createAcademicPeriodDto);
  }

  @Get()
  findAll() {
    return this.academicPeriodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicPeriodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicPeriodDto: UpdateAcademicPeriodDto) {
    return this.academicPeriodService.update(+id, updateAcademicPeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicPeriodService.remove(+id);
  }
}