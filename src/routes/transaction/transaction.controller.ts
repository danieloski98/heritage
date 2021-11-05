import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { CrudService } from './sevrices/crud/crud.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Transaction } from 'src/Schemas/Transaction';

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

  // posts
  @ApiTags('TRANSACTIONS')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: Transaction })
  @Post('create/:user_id')
  async createTransaction(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: any,
  ) {
    const result = await this.transactioncrudService.createTransaction(
      param['user_id'],
      body,
    );
    res.status(result.statusCode).json(result);
  }

  @ApiTags('TRANSACTIONS')
  @ApiParam({ name: 'transaction_id' })
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: `${process.cwd()}/transactionfiles`,
    }),
  )
  @Post('uploadfiles/:transaction_id')
  async uploadFiles(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: any,
    @UploadedFiles() files: Array<any>,
  ) {
    const result = await this.transactioncrudService.uploadFiles(
      param['transaction_id'],
      files,
    );
    res.status(result.statusCode).json(result);
  }
}
