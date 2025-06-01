import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('bulk')
  createBulk(@Body() createClassDto: CreateClassDto[]) {
    return this.classesService.createBulk(createClassDto);
  }

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get('get-one/:processNumber')
  async findAllByProcessId(@Param('processNumber') processNumber: string) {
    if (!processNumber || processNumber.trim() === '' || processNumber === 'NaN') {
      throw new BadRequestException('Invalid process number provided.');
    }

    return this.classesService.findAllByProcessId(processNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }

  @Delete('rollback/:processNumber')
  removeByProcess(@Param('processNumber') processNumber: string) {
    return this.classesService.removeByProcessNumber(+processNumber);
  }
}
