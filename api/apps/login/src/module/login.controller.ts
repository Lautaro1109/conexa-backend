import { Controller, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from './login.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User, userWithToken } from '../schema/user.schema';

@ApiTags('Auth')
@Controller('api/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  register(@Body() userObject: LoginDto): Promise<User> {
    return this.loginService.register(userObject);
  }

  @Post('login')
  login(@Body() userObject: LoginDto): Promise<userWithToken> {
    return this.loginService.login(userObject);
  }

  @Post('listUsers')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  listUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string | null,
  ): Promise<any> {
    return this.loginService.listUsers(page, limit, search);
  }
}
