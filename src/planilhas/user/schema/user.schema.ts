import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserProfile } from '../enums/user-profile.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  processNumber: string;

  @Prop({ enum: UserProfile, required: true })
  profileId: UserProfile;

  @Prop()
  subprofile?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  oab?: string;

  @Prop({ maxlength: 2 })
  oabUf?: string;

  @Prop({ required: true, maxlength: 100 })
  email: string;

  @Prop({ maxlength: 50 })
  registrationNumber?: string;

  @Prop({ maxlength: 20 })
  telephone?: string;

  @Prop({ required: true, maxlength: 14 })
  cpf: string;

  @Prop({ required: true, maxlength: 255 })
  password: string;

  @Prop({ enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
  periodId?: number;

  @Prop()
  observations?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ profileId: 1, name: 1, processNumber: 1 }, { unique: true })