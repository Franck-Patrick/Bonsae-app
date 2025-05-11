import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralService } from './general.service';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';

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
}