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
  private logger = new Logger();
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
      console.log(user);
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      } else {
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
      }
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
    names: { first_name: string; last_name: string; phone: string },
  ): Promise<ReturnTypeInterfcae> {
    try {
      // validation object
      const obj = object({
        first_name: string().trim().optional(),
        last_name: string().trim().optional(),
        phone: string().optional().trim(),
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

  public async editFinancials(
    id: string,
    names: {
      bitcoin_wallet: string;
      ethereum_wallet: string;
      usdt_wallet: string;
      bank_name: string;
      account_name: string;
      account_number: string;
    },
  ): Promise<ReturnTypeInterfcae> {
    try {
      // validation object
      const obj = object({
        bitcoin_wallet: string().trim().optional(),
        ethereum_wallet: string().trim().optional(),
        usdt_wallet: string().optional().trim(),
        account_name: string().optional().trim(),
        account_number: string().optional().trim(),
        bank_name: string().optional().trim(),
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
