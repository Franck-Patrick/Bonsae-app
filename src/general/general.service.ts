import { Injectable } from '@nestjs/common';
import { mapUserDocumentToEntity } from 'src/planilhas/user/mapper/user.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { UserEntity } from 'src/planilhas/user/entities/user.entity';
import { User, UserDocument } from 'src/planilhas/user/schema/user.schema';
import { In, Repository } from 'typeorm';
import { DisciplineEntity } from 'src/planilhas/disciplines/entities/discipline.entity';
import { Discipline, DisciplineDocument } from 'src/planilhas/disciplines/schema/discipline.schema';
import { mapDisciplineDocumentToEntity } from 'src/planilhas/disciplines/mapper/mapDocToEntity';
import { ClassEntity } from 'src/planilhas/classes/entities/class.entity';
import { Class, ClassDocument } from 'src/planilhas/classes/schema/class.schema';
import { mapClassDocToEntity } from 'src/planilhas/classes/mapper/class-dto.mapper';
import { EnrollmentEntity } from 'src/planilhas/enrollment/entities/enrollment.entity';
import { Enrollment, EnrollmentDocument } from 'src/planilhas/enrollment/schema/enrollment.schema';
import mapEnrollmentDocToEntity from 'src/planilhas/enrollment/mapper/enrollmentDocToEntity.mapper';
import { AcademicPeriodEntity } from 'src/planilhas/academic-period/entity/academic-period.entity';
import { mapAcademicPeriodDocumentToEntity } from 'src/planilhas/academic-period/mapper/doc-to-entity.mapper';
import { AcademicPeriod, AcademicPeriodDocument } from 'src/planilhas/academic-period/schema/academic-period.schema';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectModel(AcademicPeriod.name) private academicPeriodModel: Model<AcademicPeriodDocument>,
    @InjectRepository(AcademicPeriodEntity) private academicPeriodRepository: Repository<AcademicPeriodEntity>,
    @InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>,
    @InjectRepository(DisciplineEntity) private disciplineRepository: Repository<DisciplineEntity>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectRepository(ClassEntity) private classRepository: Repository<ClassEntity>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
    @InjectRepository(EnrollmentEntity) private enrollmentRepository: Repository<EnrollmentEntity>
  ) {}
  
  async saveAllDocuments(processId: string) {
    const savedAcademicPeriodList = await this.saveAcademicPeriod(processId);
    const savedDisciplines = await this.saveDisciplines(savedAcademicPeriodList);
    const savedClasses = await this.saveClasses(savedDisciplines);
    const savedUsers = await this.saveUser();
    const savedEnrollments = await this.saveEnrollments(savedClasses, savedUsers);

    return {
      academicPeriod: savedAcademicPeriodList,
      disciplines: savedDisciplines,
      classes: savedClasses,
      users: savedUsers,
      enrollments: savedEnrollments
    };
  }

  private async saveAcademicPeriod(processId: string) {
    return this.academicPeriodModel.find().where({ processId: processId }).exec()
      .then((periodos) => {
        const entities = periodos.map((periodoDoc) => {
          return mapAcademicPeriodDocumentToEntity(periodoDoc);
        });
        return this.academicPeriodRepository.save(entities);
      });
  }

  private async saveDisciplines(academicPeriodList: AcademicPeriodEntity[]) {
    const disciplineDocs = academicPeriodList.map((academicPeriod) => {
      return this.disciplineModel.find({ academicPeriod: academicPeriod.academicPeriod }).exec();
    });

    const entities = await Promise.all(disciplineDocs).then((disciplineDocsList) => {      
      return disciplineDocsList.flat().map((disciplineDoc) => {
        const entity = mapDisciplineDocumentToEntity(disciplineDoc);
        const academicPeriod = academicPeriodList.find((academicPeriod) => academicPeriod.academicPeriod === disciplineDoc.academicPeriod);
        if (!academicPeriod) {
          throw new Error(`School period not found for ${disciplineDoc.academicPeriod}`);
        }

        entity.academicPeriod = academicPeriod;
        return entity;
      });
    });
    
    return this.disciplineRepository.save(entities);
  }

  private async saveClasses(disciplinesList: DisciplineEntity[]) {
    const classesDocs = disciplinesList.map((discipline) => {
      return this.classModel.find({ disciplinaCodigo: discipline.code }).exec();
    });

    const entities = await Promise.all(classesDocs).then((classDocList) => {
      return classDocList.flat().map((classDoc) => {
        const entity = mapClassDocToEntity(classDoc);
        const subject = disciplinesList.find((discipline) => discipline.code === classDoc.disciplinaCodigo);
        const academicPeriod = subject?.academicPeriod;
        if (!subject || !academicPeriod) {
          throw new Error(`Discipline not found for ${classDoc.disciplinaCodigo}`);
        }
        entity.discipline = subject;
        entity.academicPeriod = academicPeriod;
        return entity;
      });
    });
    
    return this.classRepository.save(entities);
  }

  private async saveEnrollments(classesList: ClassEntity[], userList: UserEntity[]) {
    const enrollmentDocs = classesList.map((classEntity) => {
      return this.enrollmentModel.find({ codigoTurma: classEntity.code, disciplina: classEntity.discipline.code }).exec();
    });

    const entities = await Promise.all(enrollmentDocs).then((enrollmentDocList) => {
      return enrollmentDocList.flat().map((enrollmentDoc) => {
        const entity = mapEnrollmentDocToEntity(enrollmentDoc);
        
        const classEntity = classesList.find((classEntity) => classEntity.code === enrollmentDoc.codigoTurma);
        if (!classEntity) {
          throw new Error(`Class not found for ${enrollmentDoc.codigoTurma}`);
        }
        const userEntity = userList.find((user) => user.registrationNumber === enrollmentDoc.matricula || user.email === enrollmentDoc.email);
        if (!userEntity) {
          throw new Error(`User not found for ${enrollmentDoc.matricula || enrollmentDoc.email}`);
        }

        entity.turma = classEntity;
        entity.user = userEntity;
        return entity;
      });
    });
    
    return this.enrollmentRepository.save(entities);
  }

  private async saveUser() {
    return this.userModel.find().exec().then((users) => {
      const entities = users.map((userDoc) => {
        return mapUserDocumentToEntity(userDoc);
      });
      return this.userRepository.save(entities);
    });
  }

  async getAllDocuments(processId: string) {
    const academicPeriods = await this.academicPeriodModel
      .find({ processId })
      .exec();

    if (!academicPeriods || academicPeriods.length === 0) {
      throw new Error(`Academic period not found for processId ${processId}`);
    }

    const disciplines = await Promise.all(
      academicPeriods.map((academicPeriod) =>
        this.disciplineModel.find({ academicPeriod: academicPeriod.academicPeriod }).exec()
      )
    );
    const flatDisciplines = disciplines.flat();

    const classes = await Promise.all(
      flatDisciplines.map((discipline) =>
        this.classModel.find({ disciplinaCodigo: discipline.code }).exec()
      )
    );
    const flatClasses = classes.flat();

    // A única forma de pegar os usuários de um processo seria pegando os associados a uma matricula,
    // porém, isso retornaria apenas os professores e alunos, excluindo os demais usuários.
    const users = await this.userModel.find().exec();

    const enrollments = await Promise.all(
      flatClasses.map((classDoc) =>
        this.enrollmentModel.find({
          codigoTurma: classDoc.codigoTurma,
          disciplina: classDoc.disciplinaCodigo,
        }).exec()
      )
    );
    const flatEnrollments = enrollments.flat();

    return {
      academicPeriods,
      disciplines: flatDisciplines,
      classes: flatClasses,
      users,
      enrollments: flatEnrollments,
    };
  }

  async getAllEntities(academicPeriodCode: string) {
    const academicPeriod = await this.academicPeriodRepository.findOne({
      where: { academicPeriod: academicPeriodCode },
    });

    if (!academicPeriod) {
      throw new Error(`Academic period "${academicPeriodCode}" not found.`);
    }

    const disciplines = await this.disciplineRepository.find({
      where: { academicPeriod: { id: academicPeriod.id } },
    });
    console.log(academicPeriod);

    if (disciplines.length === 0) {
      throw new Error(`No disciplines found for academic period "${academicPeriodCode}".`);
    }

    const disciplineIds = disciplines.map(d => d.id);

    const classes = await this.classRepository.find({
      where: { discipline: { id: In(disciplineIds) } },
    });

    if (classes.length === 0) {
      throw new Error(`No classes found for academic period "${academicPeriodCode}".`);
    }

    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new Error(`No users found for academic period "${academicPeriodCode}".`);
    }

    const classIds = classes.map(c => c.id);

    const enrollments = await this.enrollmentRepository.find({
      where: { turma: { id: In(classIds) } },
    });

    if (enrollments.length === 0) {
      throw new Error(`No enrollments found for academic period "${academicPeriodCode}".`);
    }

    return {
      academicPeriod,
      disciplines,
      classes,
      users,
      enrollments,
    };
  }
}
