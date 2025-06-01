import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';
import { UpdateAcademicPeriodDto } from './dto/update-periodo-letivo.dto';
import { AcademicPeriod, AcademicPeriodDocument } from './schema/academic-period.schema';
import { DisciplinesService } from '../disciplines/disciplines.service';

@Injectable()
export class AcademicPeriodService {
    constructor(
        @InjectModel(AcademicPeriod.name) private academicPeriodModel: Model<AcademicPeriodDocument>,
        private readonly disciplinesService: DisciplinesService
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

    async findAllByProcessId(processNumber: string) {
        return this.academicPeriodModel.find({ processId: processNumber }).exec();
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

    async removeByProcessNumber(processId: number) {
        const periods = await this.academicPeriodModel.find({ processId }).exec();

        if (periods.length === 0) {
            return periods;
        }

        const periodIds = periods.map(d => d._id);
        const periodCodes = periods.map(d => d.academicPeriod);

        for (const periodCode of periodCodes) {
            const disciplines = await this.disciplinesService.findByAcademicPeriod(periodCode);
            const disciplineIds = disciplines.map(d => d._id);
            for (const disciplineId of disciplineIds) {
                await this.disciplinesService.remove(disciplineId.toString());
            }
        }
        
        const periodResult = await this.academicPeriodModel.deleteMany({
            _id: { $in: periodIds },
        }).exec();

        return {
            periodResult,
        };
    }
}
