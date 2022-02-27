import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Bank } from 'src/Schemas/Bank';
import { CrudService } from '../services/crud/crud.service';
import { VerificationService } from '../services/verification/verification.service';

@Controller('bank')
export class BankController {
  constructor(
    private bankService: CrudService,
    private verificationService: VerificationService,
  ) {}

  @ApiTags('BANK')
  @ApiBody({ type: Bank })
  @Post()
  async addBank(@Res() res: Response, @Body() body: Bank) {
    const result = await this.bankService.addBank(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('BANK')
  @Get('all')
  async getBank(@Res() res: Response) {
    const result = await this.verificationService.getAllBanks();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('BANK')
  @ApiQuery({ name: 'account_number' })
  @ApiQuery({ name: 'bank_code' })
  @Get('verifyaccount')
  async verifyaccount(@Res() res: Response, @Query() query: any) {
    console.log(query);
    const result = await this.verificationService.resolveAccount(
      query['account_number'],
      query['bank_code'],
    );
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
