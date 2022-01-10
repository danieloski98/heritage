import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Paypoint } from 'src/Schemas/Paypoints.Schema';
import { AdminService } from './services/admin/admin.service';
import { UserService } from './services/user/user.service';

@Controller('paypoint')
export class PaypointController {
  constructor(
    private adminPaypointService: AdminService,
    private userPaypointService: UserService,
  ) {}

  @ApiTags('PAYPOINT')
  @Get('')
  async getPaypoint(@Res() res: Response) {
    const request = await this.userPaypointService.getPaypoint();
    res.status(request.statusCode).send(request);
  }

  @ApiTags('ADMIN:PAYPOINT')
  @ApiBody({ type: Paypoint })
  @Post('create')
  async createPaypoint(@Res() res: Response, @Body() body: Paypoint) {
    const request = await this.adminPaypointService.createPaypoint(body);
    res.status(request.statusCode).send(request);
  }

  @ApiTags('ADMIN:PAYPOINT')
  @ApiBody({ type: Paypoint })
  @Put('')
  async updatePaypoint(@Res() res: Response, @Body() body: Paypoint) {
    const request = await this.adminPaypointService.updatePaypoint(body);
    res.status(request.statusCode).send(request);
  }
}
