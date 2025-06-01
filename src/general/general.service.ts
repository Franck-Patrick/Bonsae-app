import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectDataSource } from '@nestjs/typeorm';
import mongoose, { model, Model } from 'mongoose';
import { In, DataSource, QueryRunner } from 'typeorm';

import { UserEntity } from 'src/planilhas/user/entities/user.entity';
import { DisciplineEntity } from 'src/planilhas/disciplines/entities/discipline.entity';
import { ClassEntity } from 'src/planilhas/classes/entities/class.entity';
import { EnrollmentEntity } from 'src/planilhas/enrollment/entities/enrollment.entity';
import { AcademicPeriodEntity } from 'src/planilhas/academic-period/entity/academic-period.entity';

import { User, UserDocument } from 'src/planilhas/user/schema/user.schema';
import { Discipline, DisciplineDocument } from 'src/planilhas/disciplines/schema/discipline.schema';
import { Class, ClassDocument } from 'src/planilhas/classes/schema/class.schema';
import { Enrollment, EnrollmentDocument } from 'src/planilhas/enrollment/schema/enrollment.schema';
import { AcademicPeriod, AcademicPeriodDocument } from 'src/planilhas/academic-period/schema/academic-period.schema';

import { mapUserDocumentToEntity } from 'src/planilhas/user/mapper/user.mapper';
import { mapDisciplineDocumentToEntity } from 'src/planilhas/disciplines/mapper/mapDocToEntity';
import { mapClassDocToEntity } from 'src/planilhas/classes/mapper/class-dto.mapper';
import mapEnrollmentDocToEntity from 'src/planilhas/enrollment/mapper/enrollmentDocToEntity.mapper';
import { mapAcademicPeriodDocumentToEntity } from 'src/planilhas/academic-period/mapper/doc-to-entity.mapper';
import { Status } from 'src/planilhas/academic-period/enum/Status';

@Injectable()
export class GeneralService {
  private statusModelMap: Record<Status, Model<any>>;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(AcademicPeriod.name) private academicPeriodModel: Model<AcademicPeriodDocument>,
    @InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,

    @InjectDataSource() private readonly dataSource: DataSource
  ) {
    this.statusModelMap = {
      [Status.ACADEMIC_PERIOD]: this.academicPeriodModel,
      [Status.DISCIPLINE]: this.disciplineModel,
      [Status.CLASS]: this.classModel,
      [Status.USER]: this.userModel,
      [Status.ENROLLMENT]: this.enrollmentModel,
    };
  }

  async saveAllDocuments(processId: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const academicPeriods = await this.saveAcademicPeriodWithRunner(processId, queryRunner);
      const disciplines = await this.saveDisciplinesWithRunner(academicPeriods, processId, queryRunner);
      const classes = await this.saveClassesWithRunner(disciplines, processId, queryRunner);
      const users = await this.saveUsersWithRunner(processId, queryRunner);
      const enrollments = await this.saveEnrollmentsWithRunner(classes, users, processId, queryRunner);

      await queryRunner.commitTransaction();

      return { academicPeriods, disciplines, classes, users, enrollments };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async saveAcademicPeriodWithRunner(processId: string, queryRunner: QueryRunner): Promise<AcademicPeriodEntity[]> {
    const documents = await this.academicPeriodModel.find({ processId }).exec();
    const entities = documents.map(mapAcademicPeriodDocumentToEntity);
    return queryRunner.manager.getRepository(AcademicPeriodEntity).save(entities);
  }

  private async saveDisciplinesWithRunner(academicPeriods: AcademicPeriodEntity[], processId: string, queryRunner: QueryRunner): Promise<DisciplineEntity[]> {
    const disciplineDocs = await Promise.all(
      academicPeriods.map(period =>
        this.disciplineModel.find({ academicPeriod: period.academicPeriod, processNumber: processId }).exec()
      )
    );

    const allDocs = disciplineDocs.flat();

    const entities = allDocs.map(doc => {
      const entity = mapDisciplineDocumentToEntity(doc);
      const academicPeriod = academicPeriods.find(p => p.academicPeriod === doc.academicPeriod);
      if (!academicPeriod) throw new Error(`Academic period not found for ${doc.academicPeriod}`);
      entity.academicPeriod = academicPeriod;
      return entity;
    });

    return queryRunner.manager.getRepository(DisciplineEntity).save(entities);
  }

  private async saveClassesWithRunner(disciplines: DisciplineEntity[], processId: string, queryRunner: QueryRunner): Promise<ClassEntity[]> {
    const classDocs = await Promise.all(
      disciplines.map(discipline =>
        this.classModel.find({ disciplinaCodigo: discipline.code, processNumber: processId }).exec()
      )
    );

    const allDocs = classDocs.flat();

    const entities = allDocs.map(doc => {
      const entity = mapClassDocToEntity(doc);
      const discipline = disciplines.find(d => d.code === doc.disciplinaCodigo);
      if (!discipline || !discipline.academicPeriod) throw new Error(`Discipline or academic period not found for ${doc.disciplinaCodigo}`);
      entity.discipline = discipline;
      entity.academicPeriod = discipline.academicPeriod;
      return entity;
    });

    return queryRunner.manager.getRepository(ClassEntity).save(entities);
  }

  private async saveUsersWithRunner(processId: string, queryRunner: QueryRunner): Promise<UserEntity[]> {
    const userDocs = await this.userModel.find({ processNumber: processId }).exec();
    const entities = userDocs.map(mapUserDocumentToEntity);
    return queryRunner.manager.getRepository(UserEntity).save(entities);
  }

  private async saveEnrollmentsWithRunner(classes: ClassEntity[], users: UserEntity[], processId: string, queryRunner: QueryRunner): Promise<EnrollmentEntity[]> {
    const enrollmentDocs = await Promise.all(
      classes.map(cls =>
        this.enrollmentModel.find({
          codigoTurma: cls.code,
          disciplina: cls.discipline.code,
          processNumber: processId
        }).exec()
      )
    );

    const allDocs = enrollmentDocs.flat();

    const entities = allDocs.map(doc => {
      const entity = mapEnrollmentDocToEntity(doc);
      const classEntity = classes.find(c => c.code === doc.codigoTurma);
      const userEntity = users.find(
        u => doc.matricula ? u.registrationNumber === doc.matricula : u.email === doc.email
      );

      if (!classEntity) throw new Error(`Class not found for ${doc.codigoTurma}`);
      if (!userEntity) throw new Error(`User not found for ${doc.matricula || doc.email}`);

      entity.turma = classEntity;
      entity.user = userEntity;
      return entity;
    });

    return queryRunner.manager.getRepository(EnrollmentEntity).save(entities);
  }

  async getAllDocuments(processNumber: string) {
    const academicPeriods = await this.academicPeriodModel.find({ processId: processNumber }).exec();
    if (!academicPeriods.length) {
      throw new Error(`No academic periods found for process number "${processNumber}"`);
    }

    const disciplines = await this.disciplineModel.find({ processNumber }).exec();
    const classes = await this.classModel.find({ processNumber }).exec();
    const users = await this.userModel.find({ processNumber }).exec();
    const enrollments = await this.enrollmentModel.find({ processNumber }).exec();

    return { academicPeriods, disciplines, classes, users, enrollments };
  }

  async getAllEntities(academicPeriodCode: string) {
    const academicPeriod = await this.dataSource.getRepository(AcademicPeriodEntity).findOne({
      where: { academicPeriod: academicPeriodCode }
    });
    if (!academicPeriod) throw new Error(`Academic period "${academicPeriodCode}" not found.`);

    const disciplines = await this.dataSource.getRepository(DisciplineEntity).find({
      where: { academicPeriod: { id: academicPeriod.id } }
    });
    if (!disciplines.length) throw new Error(`No disciplines found for ${academicPeriodCode}`);

    const disciplineIds = disciplines.map(d => d.id);

    const classes = await this.dataSource.getRepository(ClassEntity).find({
      where: { discipline: { id: In(disciplineIds) } }
    });
    if (!classes.length) throw new Error(`No classes found for ${academicPeriodCode}`);

    const users = await this.dataSource.getRepository(UserEntity).find();
    if (!users.length) throw new Error(`No users found.`);

    const classIds = classes.map(c => c.id);

    const enrollments = await this.dataSource.getRepository(EnrollmentEntity).find({
      where: { turma: { id: In(classIds) } }
    });
    if (!enrollments.length) throw new Error(`No enrollments found for ${academicPeriodCode}`);

    return { academicPeriod, disciplines, classes, users, enrollments };
  }

  async getByCurrentStatus(processId: string) {
    const currentStepDoc = await this.academicPeriodModel.findOne({processId}).lean();
    if (!currentStepDoc || !currentStepDoc.currentStep) return 'No status set';

    const step = currentStepDoc.currentStep as Status;
    const Model = this.statusModelMap[step];

    if (!Model) {
      throw new Error(`No model mapped for step: '${currentStepDoc.currentStep}'`);
    }

    return await Model.find({
      $or: [
      { processId: processId },
      { processNumber: processId }
      ]
    }).exec();
  }

  updateStatus(newStep: Status, processId: string) {
    const possibleStatus = Object.values(Status);
    if (!(possibleStatus.includes(newStep))) return;

    return this.academicPeriodModel.updateMany(
      {processId},
      { $set: { currentStep: newStep } }
    ).exec();
  }
}