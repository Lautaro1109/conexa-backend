import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { LoginDto } from '../dto/login.dto';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('BUSINESS_SERVICE') private readonly businessClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async register(userObject: LoginDto): Promise<User> {
    const { password } = userObject;

    const user = await this.userModel.findOne({ mail: userObject.mail });

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const hashedPassword = await hash(password, 10);

    userObject = {
      ...userObject,
      password: hashedPassword,
    };

    return this.userModel.create(userObject);
  }

  async login(userObject: LoginDto): Promise<User | any> {
    const { mail, password } = userObject;
    const user = await this.userModel.findOne({ mail });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);

    const payload = {
      id: user._id,
      mail: user.mail,
    };

    const token = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      token,
    };
  }

  listUsers(page, limit, search): any {
    return this.businessClient.send('get_users_list', {
      page,
      limit,
      search,
    });
  }
}
