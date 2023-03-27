import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { BusinessService } from './business.service';
import { UserListDto } from './dto/userList.dto';
import { User } from '../../../apps/login/src/schema/user.schema';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @MessagePattern('get_users_list')
  getUserList(payload: UserListDto): Promise<User[]> {
    return this.businessService.getUserList(payload);
  }
}
