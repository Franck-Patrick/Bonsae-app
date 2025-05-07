import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Método para enviar os usuários do MongoDB para o MySQL
  @Post('sendToMysql')
  sendToMysql() {
    return this.userService.saveToMysql();
  }

  // Método para criar uma lista de usuários
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

  // Método para buscar um usuário por ID, provavelmente precisará ser ajustado para utilizar outro dado da planilha
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // Método para atualizar um usuário por ID, provavelmente precisará ser ajustado para utilizar outro dado da planilha
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // Método para remover um usuário por ID, provavelmente precisará ser ajustado para utilizar outro dado da planilha
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
