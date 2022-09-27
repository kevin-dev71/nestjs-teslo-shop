import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { RawHeaders } from '../common/decorators';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { VALID_ROLES } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  @Get('private2')
  @RoleProtected(VALID_ROLES.superUser, VALID_ROLES.admin, VALID_ROLES.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  private2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
    };
  }

  @Get('private3')
  @Auth()
  // @Auth(VALID_ROLES.admin)
  private3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
    };
  }
}
