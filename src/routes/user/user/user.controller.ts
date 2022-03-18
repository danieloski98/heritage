import { Body, Controller, Get, Param, Put, Res, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/Schemas/User';
import { AddingWallet } from 'src/utils/types/Adressadding';
import { EditingDetails, EditingNames } from 'src/utils/types/editingnames';
import { AddressService } from '../services/address/address.service';
import { CrudService } from '../services/crud/crud.service';
import { ProfileService } from '../services/profile/profile.service';

@Controller('user')
export class UserController {
  constructor(
    private profileService: ProfileService,
    private addressService: AddressService,
    private crudService: CrudService,
  ) {}

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @Get(':user_id')
  async getUser(@Res() res: Response, @Param() param: any) {
    const result = await this.profileService.getUserDetails(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN:USER')
  @Get('')
  async getUsers(@Res() res: Response) {
    const result = await this.crudService.getUsers();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: EditingNames })
  @Post('pin/:id')
  async updatePin(
    @Res() res: Response,
    @Body() body: { pin: string },
    @Param() param: any,
  ) {
    const result = await this.crudService.createPin(param['id'], body.pin);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'pin' })
  @ApiBody({ type: EditingNames })
  @Get('pin/:id/:pin')
  async verifyPin(
    @Res() res: Response,
    @Body() body: { pin: string },
    @Param() param: any,
  ) {
    const result = await this.crudService.verifyPin(param['id'], param['pin']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: EditingNames })
  @Put('edit/names/:user_id')
  async updatenames(
    @Res() res: Response,
    @Body() body: { first_name: string; last_name: string; phone: string },
    @Param() param: any,
  ) {
    const result = await this.profileService.editName(param['user_id'], body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN:USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: User })
  @Put('admin/edit/:user_id')
  async updateuserdetailsadmin(
    @Res() res: Response,
    @Body() body: User,
    @Param() param: any,
  ) {
    const result = await this.crudService.updateUser(param['user_id'], body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: EditingDetails })
  @Put('edit/details/:user_id')
  async updatefin(
    @Res() res: Response,
    @Body()
    body: {
      bitcoin_wallet: string;
      ethereum_wallet: string;
      usdt_wallet: string;
      bank_name: string;
      account_name: string;
      account_number: string;
    },
    @Param() param: any,
  ) {
    const result = await this.profileService.editFinancials(
      param['user_id'],
      body,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: AddingWallet })
  @Put('wallets/btc/:user_id')
  async updateBTCwallet(
    @Res() res: Response,
    @Body() body: { wallet: string },
    @Param() param: any,
  ) {
    const result = await this.addressService.addBTC(
      param['user_id'],
      body.wallet,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: AddingWallet })
  @Put('wallets/eth/:user_id')
  async updateETHwallet(
    @Res() res: Response,
    @Body() body: { wallet: string },
    @Param() param: any,
  ) {
    const result = await this.addressService.addETH(
      param['user_id'],
      body.wallet,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: AddingWallet })
  @Put('wallets/usdt/:user_id')
  async updateUSDTwallet(
    @Res() res: Response,
    @Body() body: { wallet: string },
    @Param() param: any,
  ) {
    const result = await this.addressService.addUSDT(
      param['user_id'],
      body.wallet,
    );
    res.status(result.statusCode).send(result);
  }
}
