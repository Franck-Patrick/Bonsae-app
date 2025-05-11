import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ShiftEnum } from '../enum/shift.enum';

export type ClassDocument = Class & Document;

@Schema({ timestamps: true })
export class Class {
    @Prop({ type: Types.ObjectId, ref: 'Disciplines', required: true })
    disciplina: Types.ObjectId;

    @Prop({ required: true })
    disciplinaCodigo: string;

    @Prop({ required: true, enum: ShiftEnum })
    turno: string;

    @Prop({ required: true })
    turma: string;

    @Prop({ required: true })
    codigoTurma: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);