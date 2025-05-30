import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto, CreateProfessorDto, CreateStudentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { mapToEnrollmentDto } from './mapper/enrollmentDto.mapper';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('bulk')
  async createBulk(
    @Body('students') createStudentDtoList?: CreateStudentDto[],
    @Body('professors') createProfessorDtoList?: CreateProfessorDto[]
  ) {
    if (!createStudentDtoList && !createProfessorDtoList) {
      throw new Error('No data provided for bulk creation');
    }
    if (!createStudentDtoList?.length && !createProfessorDtoList?.length) {
      throw new Error('No data provided for bulk creation');
    }
    
    const enrollmentDtos = [
      ...(createStudentDtoList?.map(mapToEnrollmentDto) || []),
      ...(createProfessorDtoList?.map(mapToEnrollmentDto) || []),
    ];

    return this.enrollmentService.createBulk(enrollmentDtos);
  }

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }

  @Delete('rollback/:processNumber')
  removeByProcess(@Param('processNumber') processNumber: number) {
    return this.enrollmentService.removeByProcessNumber(processNumber);
  }
}
