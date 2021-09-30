import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Schemas/User';
import { ReturnTypeInterfcae, Return } from 'src/utils/types/returnType';

@Injectable()
export class AddressService {
  logger = new Logger();

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async addBTC(
    id: string,
    wallet: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const updated = await this.userModel.updateOne(
        { _id: id },
        { bitcoin_wallet: wallet },
      );
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Bitcoin wallet address added!',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async addETH(
    id: string,
    wallet: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const updated = await this.userModel.update(
        { _id: id },
        { ethereum_wallet: wallet },
      );
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Ethereum wallet address added!',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async addUSDT(
    id: string,
    wallet: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const updated = await this.userModel.update(
        { _id: id },
        { usdt_wallet: wallet },
      );
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'USDT wallet address added!',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
