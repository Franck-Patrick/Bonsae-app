import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../enum/Status";

export type AcademicPeriodDocument = AcademicPeriod & Document;

@Schema({ timestamps: true })
export class AcademicPeriod {
  @Prop({ required: true })
  processId: string;

  @Prop({ required: true, unique: true })
  academicPeriod: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, enum: Status })
  currentStep: Status
}

export const AcademicPeriodSchema = SchemaFactory.createForClass(AcademicPeriod);