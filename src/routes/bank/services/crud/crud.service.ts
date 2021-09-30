import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Bank, BankDocument } from 'src/Schemas/Bank';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(@InjectModel(Bank.name) private bankModel: Model<BankDocument>) {}

  public async addBank(bank: Bank): Promise<ReturnTypeInterfcae> {
    try {
      const newbank = await this.bankModel.create(bank);
      this.logger.log(newbank);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Bank added',
        data: newbank,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async editBank(id: string, bank: Bank): Promise<ReturnTypeInterfcae> {
    try {
      // check if there is a bank with that id
      const bankExist = await this.bankModel.findOne({ _id: id });
      if (bankExist === undefined) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Bank not found',
        });
      }
      // edit the bank

      const newbank = await this.bankModel.updateOne({ _id: id }, bank);
      this.logger.log(newbank);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Bank edited',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async deleteBank(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const newbank = await this.bankModel.deleteOne({ _id: id });
      this.logger.log(newbank);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Bank deleted',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }
}
