import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplineDocument = Discipline & Document;

@Schema({ timestamps: true })
export class Discipline {
  @Prop({ required: true })
  'Período Letivo (Identificação)': string;

  @Prop()
  'Disciplina'?: string;

  @Prop({ required: true })
  'Código da Disciplina': string;

  @Prop({ required: true })
  'Data Inicial': Date;

  @Prop({ required: true })
  'Data Final': Date;

  @Prop({
    required: true,
    enum: ['Curso', 'NPJ', 'Projetos Extensionistas', 'TCC']
  })
  'Categoria': 'Curso' | 'NPJ' | 'Projetos Extensionistas' | 'TCC';

  @Prop()
  'Período Curricular'?: string;

  @Prop({ required: true })
  'Estado': string;

  @Prop({ required: true })
  'Campus': string;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);