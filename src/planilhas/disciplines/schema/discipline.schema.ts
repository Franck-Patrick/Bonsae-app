import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DisciplineDocument = Discipline & Document;

@Schema({ timestamps: true })
export class Discipline {
  @Prop({ type: Types.ObjectId, ref: 'AcademicPeriod', required: true })
  academicPeriodDoc: Types.ObjectId;

  @Prop({ required: true })
  academicPeriod: string;

  @Prop()
  name?: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    required: true,
    enum: ['Curso', 'NPJ', 'Projetos Extensionistas', 'TCC']
  })
  category: 'Curso' | 'NPJ' | 'Projetos Extensionistas' | 'TCC';

  @Prop()
  curricularPeriod?: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  campus: string;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);