import { Injectable } from '@nestjs/common';
import { UserListDto } from './dto/userList.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../../../apps/login/src/schema/user.schema';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserList(payload: UserListDto): Promise<User[]> {
    const { page, limit, search } = payload;
    const skip = page * limit;

    const query = search ? { mail: { $regex: search, $options: 'i' } } : {};

    return this.userModel.find(query).skip(skip).limit(limit).exec();
  }
}
