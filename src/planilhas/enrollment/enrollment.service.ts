import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto, CreateProfessorDto, CreateStudentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { EnrollmentDocument } from './schema/enrollment.schema';
import { ClassDocument } from '../classes/schema/class.schema';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel('Enrollment') private enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Class') private classModel: Model<ClassDocument>,
  ) {}

  private async findUserByMatriculaOrEmail(matricula?: string, email?: string): Promise<UserDocument> {
    const userDoc = await this.userModel
      .findOne({
        $or: [
          { email: email },
          { matricula: matricula }
        ]
      })
      .exec();
    if (!userDoc) {
      throw new Error(`User not found for ${matricula}`);
    }
    return userDoc;
  }

  private async findClassByCode(codigoTurma: string, disciplinaCodigo: string): Promise<ClassDocument> {
    const classDoc = await this.classModel
      .findOne({ codigoTurma, disciplinaCodigo })
      .exec();
    if (!classDoc) {
      throw new Error(`Class not found for ${codigoTurma}, ${disciplinaCodigo}`);
    }
    return classDoc;
  }
  
  async createBulk(createEnrollmentDtoList: CreateEnrollmentDto[]) {
    const enrollmentDocuments = await Promise.all(
      createEnrollmentDtoList.map(async (enrollmentDto) => {
        const userDoc = await this.findUserByMatriculaOrEmail(
          enrollmentDto.matricula,
          enrollmentDto.email
        );

        const classDoc = await this.findClassByCode(enrollmentDto.codigoTurma, enrollmentDto.disciplina);

        if (!userDoc) {
          throw new Error(
            `User not found for ${enrollmentDto.matricula || enrollmentDto.email}`
          );
        }

        if (!classDoc) {
          throw new Error(
            `Class not found for códigoTurma: ${enrollmentDto.codigoTurma}`
          );
        }

        const enrollment = new this.enrollmentModel({
          ...enrollmentDto,
          usuario: userDoc._id,
          turma: classDoc._id,
        });

        return enrollment;
      })
    );

    return this.enrollmentModel.insertMany(enrollmentDocuments);
  }

  create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentModel.create(createEnrollmentDto);
  }

  findAll() {
    return this.enrollmentModel.find().exec();
  }

  findOne(id: number) {
    return this.enrollmentModel.findById(id).exec();
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentModel.findByIdAndUpdate(id, updateEnrollmentDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.enrollmentModel.findByIdAndDelete(id).exec();
  }
}
