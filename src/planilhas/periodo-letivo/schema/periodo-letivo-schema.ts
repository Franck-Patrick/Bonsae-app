import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PeriodoLetivoDocument = PeriodoLetivo & Document;

@Schema({ timestamps: true })
export class PeriodoLetivo {
  @Prop({ required: true })
  processId: string;

  @Prop({ required: true })
  academicPeriod: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const PeriodoLetivoSchema = SchemaFactory.createForClass(PeriodoLetivo);