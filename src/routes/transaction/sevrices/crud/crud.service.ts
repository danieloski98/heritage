import { Transaction, TransactionDocument } from 'src/Schemas/Transaction';
import { Injectable, Logger } from '@nestjs/common';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  public async getUserTransactions(
    user_id: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const trans = await this.transactionModel.find({ user_id });
      if (trans.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: "You don't have any transactions",
        });
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Transactions found',
        data: trans,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async getSingleTransactions(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const trans = await this.transactionModel.findOne({ _id: id });
      if (trans === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'transaction not found',
        });
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Transaction found',
        data: trans,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
