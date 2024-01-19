import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserDTO } from 'src/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('create')
  public async createUser(@Body() userData: UserDTO) {
    const hashedPassword = await this.authService.hashPassword(
      userData.password,
    );
    const hashedUserData = {
      ...userData,
      password: hashedPassword,
    };
    return this.userService.create(hashedUserData);
  }
}
