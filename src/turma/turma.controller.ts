import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TurmaService } from './turma.service';
import { ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('turmas')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload de arquivo CSV para inserir turmas' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo CSV contendo os dados das turmas',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadTurmas(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Nenhum arquivo enviado.', HttpStatus.BAD_REQUEST);
    }
    return this.turmaService.processCsv(file);
  }
}