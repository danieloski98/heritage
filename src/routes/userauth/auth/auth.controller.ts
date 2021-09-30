import { Body, Controller, Post, Res, Param, Put, Get } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/Entity/User.entity';
import { AuthService } from '../services/auth/auth.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private userauth: AuthService) {}

  @ApiTags('USERAUTH')
  @ApiParam({ name: 'user_id', type: String })
  @Get('verify/:user_id')
  async verifyemail(
    @Res() res: Response,
    @Body() body: { oldpassword: string; newpassword: string },
    @Param() param: any,
  ) {
    const result = await this.userauth.verifyAccount(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USERAUTH')
  @ApiBody({ type: User })
  @Post('signup')
  async Signup(@Res() res: Response, @Body() body: Partial<User>) {
    const result = await this.userauth.signup(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USERAUTH')
  @ApiBody({ type: User })
  @Post('login')
  async login(@Res() res: Response, @Body() body: Partial<User>) {
    const result = await this.userauth.login(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USERAUTH')
  @ApiParam({ name: 'user_id', type: String })
  @Put('changepassword/:user_id')
  async changepassword(
    @Res() res: Response,
    @Body() body: { oldpassword: string; newpassword: string },
    @Param() param: any,
  ) {
    const result = await this.userauth.updatePassword(param['user_id'], body);
    res.status(result.statusCode).send(result);
  }
}
