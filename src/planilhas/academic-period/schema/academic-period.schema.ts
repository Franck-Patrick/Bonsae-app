import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AcademicPeriodDocument = AcademicPeriod & Document;

@Schema({ timestamps: true })
export class AcademicPeriod {
  @Prop({ required: true })
  processId: string;

  @Prop({ required: true })
  academicPeriod: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const AcademicPeriodSchema = SchemaFactory.createForClass(AcademicPeriod);