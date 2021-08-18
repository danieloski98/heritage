import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { ReturnTypeInterfcae, Return } from 'src/utils/types/returnType';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  logger = new Logger();

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async addBTC(
    id: string,
    wallet: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const updated = await this.userRepo.update(
        { id },
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
      const updated = await this.userRepo.update(
        { id },
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
      const updated = await this.userRepo.update(
        { id },
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
