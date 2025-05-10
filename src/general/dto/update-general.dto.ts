import { PartialType } from '@nestjs/swagger';
import { CreateGeneralDto } from './create-general.dto';

export class UpdateGeneralDto extends PartialType(CreateGeneralDto) {}
