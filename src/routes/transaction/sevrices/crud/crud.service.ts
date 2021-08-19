import { Transaction } from './../../../../Entity/Transactions.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  public async getUserTransactions(
    user_id: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const trans = await this.transactionRepo.find({ where: { user_id } });
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
      const trans = await this.transactionRepo.findOne({ where: { id } });
      if (trans === undefined) {
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
