import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Admin } from 'src/Schemas/Admin.Schema';
import { CrudService } from './services/crud/crud.service';

@Controller('admins')
export class AdminsController {
  constructor(private crudService: CrudService) {}

  @ApiTags('ADMIN')
  @Get('analytics')
  async getAnalytics(@Res() res: Response) {
    const result = await this.crudService.analytics();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiBody({ type: Admin })
  @Post('create')
  async createAdmin(@Res() res: Response, @Body() body: Admin) {
    const result = await this.crudService.createAdmin(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiBody({ type: Admin })
  @Post('login')
  async loginAdmin(@Res() res: Response, @Body() body: Admin) {
    const result = await this.crudService.login(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @Get(':id')
  async getAdmin(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.getAdminById(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @Get('')
  async getAdmins(@Res() res: Response) {
    const result = await this.crudService.getAdmin();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: Admin })
  @Put(':id')
  async editAdmins(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: any,
  ) {
    const result = await this.crudService.editAdmin(param['id'], body);
    res.status(result.statusCode).send(result);
  }
}
