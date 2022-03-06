import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Support } from 'src/Schemas/Support.Schema';
import { SupportService } from './service/support/support.service';

@Controller('support')
export class SupportController {
  constructor(private supportService: SupportService) {}
  @ApiTags('Support')
  @ApiBody({ type: Support })
  @Post()
  async createMessage(@Res() res: Response, @Body() body: Support) {
    const result = await this.supportService.createSupport(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('Support')
  @Get()
  async getMessage(@Res() res: Response) {
    const result = await this.supportService.getSupport();
    res.status(result.statusCode).send(result);
  }
}
