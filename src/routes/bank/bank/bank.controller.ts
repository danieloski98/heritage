import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Bank } from 'src/Entity/Bank.entity';
import { CrudService } from '../services/crud/crud.service';

@Controller('bank')
export class BankController {
  constructor(private bankService: CrudService) {}

  @ApiTags('BANK')
  @ApiBody({ type: Bank })
  @Post()
  async addBank(@Res() res: Response, @Body() body: Bank) {
    const result = await this.bankService.addBank(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('BANK')
  @ApiBody({ type: Bank })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async editBank(
    @Res() res: Response,
    @Body() body: Bank,
    @Param() param: any,
  ) {
    const result = await this.bankService.editBank(param['id'], body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('BANK')
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deleteBank(@Res() res: Response, @Param() param: any) {
    const result = await this.bankService.deleteBank(param['id']);
    res.status(result.statusCode).send(result);
  }
}
