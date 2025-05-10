import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { mapUserDocumentToEntity } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  createBulk(createUserDtoList: CreateUserDto[]) {
    const userDocuments = createUserDtoList.map((userDto) => new this.userModel(userDto));
    return this.userModel.insertMany(userDocuments);
  }

  create(createUserDto: CreateUserDto) {
    const userDocument = new this.userModel(createUserDto);
    return this.userModel.create(userDocument);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
