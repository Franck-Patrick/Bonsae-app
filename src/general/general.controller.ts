import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GeneralService } from './general.service';
import { Status } from 'src/planilhas/academic-period/enum/Status';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post('saveAllDocuments/:processId')
  saveAllDocuments(@Param('processId') processId: string) {
    return this.generalService.saveAllDocuments(processId);
  }

  @Get('getAllDocuments/:processId')
  getAllDocuments(@Param('processId') processId: string) {
    return this.generalService.getAllDocuments(processId);
  }

  @Get('getAllEntities/:academicPeriod')
  getAllEntities(@Param('academicPeriod') academicPeriod: string) {
    return this.generalService.getAllEntities(academicPeriod);
  }

  @Get('status/:processId')
  getByCurrentStatus(@Param('processId') processId: string) {
    return this.generalService.getByCurrentStatus(processId);
  }

  @Put('status/:processId')
  updateStatus(@Param('processId') processId: string, @Body('newStep') newStep: Status) {
    return this.generalService.updateStatus(newStep, processId);
  }
}