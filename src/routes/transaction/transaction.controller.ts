import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CrudService } from './sevrices/crud/crud.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactioncrudService: CrudService) {}

  @ApiTags('TRANSACTIONS')
  @ApiParam({ name: 'user_id' })
  @Get('all/:user_id')
  async getTransactions(@Res() res: Response, @Param() param: any) {
    const result = await this.transactioncrudService.getUserTransactions(
      param['user_id'],
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('TRANSACTIONS')
  @ApiParam({ name: 'id' })
  @Get(':id')
  async getSingleTransactions(@Res() res: Response, @Param() param: any) {
    const result = await this.transactioncrudService.getSingleTransactions(
      param['id'],
    );
    res.status(result.statusCode).send(result);
  }
}
