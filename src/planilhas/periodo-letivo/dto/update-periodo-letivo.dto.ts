import { PartialType } from '@nestjs/swagger';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';

export class UpdatePeriodoLetivoDto extends PartialType(CreatePeriodoLetivoDto) {}
