import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AddingWallet } from 'src/utils/types/Adressadding';
import { EditingNames } from 'src/utils/types/editingnames';
import { AddressService } from '../services/address/address.service';
import { ProfileService } from '../services/profile/profile.service';

@Controller('user')
export class UserController {
  constructor(
    private profileService: ProfileService,
    private addressService: AddressService,
  ) {}

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: EditingNames })
  @Put('edit/names/:user_id')
  async updatenames(
    @Res() res: Response,
    @Body() body: { first_name: string; last_name: string },
    @Param() param: any,
  ) {
    const result = await this.profileService.editName(param['user_id'], body);
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
