import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from 'src/Schemas/User';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { object, string } from 'joi';
import { InjectModel } from '@nestjs/mongoose';
import { Bank, BankDocument } from 'src/Schemas/Bank';
import { Model } from 'mongoose';
import { WalletDocument, Wallet } from 'src/Schemas/Wallet';
import { TransactionDocument, Transaction } from 'src/Schemas/Transaction';

@Injectable()
export class ProfileService {
  logger = new Logger();
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Bank.name) private bankModel: Model<BankDocument>,
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  public async getUserDetails(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findById(id);
      const wallets = await this.walletModel.find({ user_id: id });
      const banks = await this.bankModel.find({ user_id: id });
      const transactions = await this.transactionModel.find({ user_id: id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User found',
        data: {
          user,
          wallets,
          banks,
          transactions,
        },
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

  public async editName(
    id: string,
    names: { first_name: string; last_name: string },
  ): Promise<ReturnTypeInterfcae> {
    try {
      // validation object
      const obj = object({
        first_name: string().trim(),
        last_name: string().trim(),
      });

      const validationResult = await obj.validate(names);

      if (validationResult.error) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: validationResult.error.message,
          trace: validationResult.error,
        });
      }

      // updated
      const updated = await this.userModel.updateOne({ _id: id }, names);
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Names updated',
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
