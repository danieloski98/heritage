import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Body,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CrudService } from './sevrices/crud/crud.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Transaction } from 'src/Schemas/Transaction';

@Controller('transaction')
export class TransactionController {
  constructor(private transactioncrudService: CrudService) {}

  @ApiTags('TRANSACTIONS')
  @ApiParam({ name: 'user_id' })
  @ApiQuery({
    name: 'type',
    type: Number,
    description: 'indicates the type of transactions 1=Buy 2=Sell',
    required: false,
  })
  @ApiQuery({
    name: 'createdAt',
    type: String,
    description: 'indicates the date of the transaction transactions',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: Number,
    description: 'indicates the state of transaction transactions',
    required: false,
  })
  @ApiQuery({
    name: 'last_id',
    type: Number,
    description: 'this is for pagination, this the the id of the last doc in the previous query',
    required: false,
  })
  @Get('all/:user_id')
  async getTransactions(
    @Res() res: Response,
    @Param() param: any,
    @Query() queries: any,
  ) {
    console.log(queries);
    const result = await this.transactioncrudService.getUserTransactions(
      param['user_id'],
      queries,
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
