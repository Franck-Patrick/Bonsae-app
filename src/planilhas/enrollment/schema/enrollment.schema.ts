import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
    @Prop({ type: Types.ObjectId, ref: 'Classes', required: true })
    turma: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    usuario: Types.ObjectId;

    @Prop({ required: true })
    disciplina: string;

    @Prop({ required: true })
    codigoTurma: string;

    @Prop()
    matricula?: string;

    @Prop()
    email?: string;

    @Prop({ required: true })
    isProfessor: boolean;

    @Prop({ required: true })
    processNumber: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ turma: 1, usuario: 1, processNumber: 1 }, { unique: true })