import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Express } from 'express';

@Controller('periodo-letivos')
export class PeriodoLetivoController {
  constructor(private readonly periodoLetivoService: PeriodoLetivoService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload de arquivo CSV para inserir períodos letivos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo CSV contendo os dados dos períodos letivos',
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
  async uploadPeriodoLetivo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Nenhum arquivo enviado.', HttpStatus.BAD_REQUEST);
    }
    return this.periodoLetivoService.processCsv(file);
  }
}
