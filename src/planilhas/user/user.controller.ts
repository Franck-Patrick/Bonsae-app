import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bulk')
  createBulk(@Body() createUserDtoList: CreateUserDto[]) {
    return this.userService.createBulk(createUserDtoList);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('get-one/:processNumber')
  async findAllByProcessId(@Param('processNumber') processNumber: string) {
    if (!processNumber || processNumber.trim() === '' || processNumber === 'NaN') {
      throw new BadRequestException('Invalid process number provided.');
    }

    return this.userService.findAllByProcessId(processNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Delete('rollback/:processNumber')
  removeByProcess(@Param('processNumber') processNumber: string) {
    return this.userService.removeByProcessNumber(+processNumber);
  }
}
