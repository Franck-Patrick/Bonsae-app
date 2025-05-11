import { Injectable } from '@nestjs/common';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';
import { mapUserDocumentToEntity } from 'src/planilhas/user/mapper/user.mapper';
import { mapPeriodoLetivoDocumentToEntity } from 'src/planilhas/periodo-letivo/mapper/mapPeriodoLetivoDocToEntity';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PeriodoLetivoEntity } from 'src/planilhas/periodo-letivo/entities/periodo-letivo.entity';
import { PeriodoLetivo, PeriodoLetivoDocument } from 'src/planilhas/periodo-letivo/schema/periodo-letivo-schema';
import { UserEntity } from 'src/planilhas/user/entities/user.entity';
import { User, UserDocument } from 'src/planilhas/user/schema/user.schema';
import { Repository } from 'typeorm';
import { DisciplineEntity } from 'src/planilhas/disciplines/entities/discipline.entity';
import { Discipline, DisciplineDocument } from 'src/planilhas/disciplines/schema/discipline.schema';
import { mapDisciplineDocumentToEntity } from 'src/planilhas/disciplines/mapper/mapDocToEntity';
import { ClassEntity } from 'src/planilhas/classes/entities/class.entity';
import { Class, ClassDocument } from 'src/planilhas/classes/schema/class.schema';
import { mapClassDocToEntity } from 'src/planilhas/classes/mapper/class-dto.mapper';
import { EnrollmentEntity } from 'src/planilhas/enrollment/entities/enrollment.entity';
import { Enrollment, EnrollmentDocument } from 'src/planilhas/enrollment/schema/enrollment.schema';
import mapEnrollmentDocToEntity from 'src/planilhas/enrollment/mapper/enrollmentDocToEntity.mapper';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectModel(PeriodoLetivo.name) private periodoLetivoModel: Model<PeriodoLetivoDocument>,
    @InjectRepository(PeriodoLetivoEntity) private periodoLetivoRepository: Repository<PeriodoLetivoEntity>,
    @InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>,
    @InjectRepository(DisciplineEntity) private disciplineRepository: Repository<DisciplineEntity>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectRepository(ClassEntity) private classRepository: Repository<ClassEntity>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
    @InjectRepository(EnrollmentEntity) private enrollmentRepository: Repository<EnrollmentEntity>
  ) {}
  
  async saveAllDocuments(processId: string) {
    const savedPeriodoLetivoList = await this.savePeriodoLetivo(processId);
    const savedDisciplines = await this.saveDisciplines(savedPeriodoLetivoList);
    const savedClasses = await this.saveClasses(savedDisciplines);
    const savedUsers = await this.saveUser();
    const savedEnrollments = await this.saveEnrollments(savedClasses, savedUsers);

    return {
      periodoLetivo: savedPeriodoLetivoList,
      disciplines: savedDisciplines,
      classes: savedClasses,
      users: savedUsers,
      enrollments: savedEnrollments
    };
  }

  private async savePeriodoLetivo(processId: string) {
    return this.periodoLetivoModel.find().where({ processId: processId }).exec()
      .then((periodos) => {
        const entities = periodos.map((periodoDoc) => {
          return mapPeriodoLetivoDocumentToEntity(periodoDoc);
        });
        return this.periodoLetivoRepository.save(entities);
      });
  }

  private async saveDisciplines(periodoLetivoList: PeriodoLetivoEntity[]) {
    const disciplineDocs = periodoLetivoList.map((periodo) => {
      return this.disciplineModel.find({ academicPeriod: periodo.code }).exec();
    });

    const entities = await Promise.all(disciplineDocs).then((disciplineDocsList) => {      
      return disciplineDocsList.flat().map((disciplineDoc) => {
        const entity = mapDisciplineDocumentToEntity(disciplineDoc);
        const schoolPeriod = periodoLetivoList.find((periodo) => periodo.code === disciplineDoc.academicPeriod);
        if (!schoolPeriod) {
          throw new Error(`School period not found for ${disciplineDoc.academicPeriod}`);
        }

        entity.schoolPeriod = schoolPeriod;
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
        const schoolPeriod = subject?.schoolPeriod;
        if (!subject || !schoolPeriod) {
          throw new Error(`Discipline not found for ${classDoc.disciplinaCodigo}`);
        }
        entity.discipline = subject;
        entity.schoolPeriod = schoolPeriod;
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
}
