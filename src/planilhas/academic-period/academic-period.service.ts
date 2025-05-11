import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';
import { UpdateAcademicPeriodDto } from './dto/update-periodo-letivo.dto';
import { AcademicPeriodEntity } from './entity/academic-period.entity';
import { AcademicPeriod, AcademicPeriodDocument } from './schema/academic-period.schema';

@Injectable()
export class AcademicPeriodService {
    constructor(
        @InjectModel(AcademicPeriod.name) private academicPeriodModel: Model<AcademicPeriodDocument>
    ) {}

    createBulk(createAcademicPeriodDtoList: CreateAcademicPeriodDto[]) {
        const academicPeriodDocuments = createAcademicPeriodDtoList.map((academicPeriodDto) => new this.academicPeriodModel(academicPeriodDto));
        return this.academicPeriodModel.insertMany(academicPeriodDocuments);
    }

    create(createAcademicPeriodDto: CreateAcademicPeriodDto) {
        return this.academicPeriodModel.create(createAcademicPeriodDto);
    }

    findAll() {
        return this.academicPeriodModel.find().exec();
    }

    findAllByProcessId(processId: string) {
        return this.academicPeriodModel.find().where({processId: processId}).exec();
    }

    findOne(id: number) {
        return this.academicPeriodModel.findById(id).exec();
    }

    update(id: number, updateAcademicPeriodDto: UpdateAcademicPeriodDto) {
        return this.academicPeriodModel.findByIdAndUpdate(id, updateAcademicPeriodDto, { new: true }).exec();
    }

    remove(id: number) {
        return this.academicPeriodModel.findByIdAndDelete(id).exec();
    }
}
