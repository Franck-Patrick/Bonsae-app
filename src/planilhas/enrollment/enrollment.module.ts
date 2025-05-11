import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { UserSchema } from '../user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchema } from '../classes/schema/class.schema';
import { UserModule } from '../user/user.module';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { EnrollmentSchema } from './schema/enrollment.schema';
import { ClassesModule } from '../classes/classes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enrollment', schema: EnrollmentSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Class', schema: ClassSchema },
    ]),
    TypeOrmModule.forFeature([EnrollmentEntity]),
    UserModule,
    ClassesModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [
    MongooseModule,
    TypeOrmModule,
  ]
})
export class EnrollmentModule {}
