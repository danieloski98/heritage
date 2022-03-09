import { Transaction, TransactionDocument } from 'src/Schemas/Transaction';
import { Injectable, Logger } from '@nestjs/common';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as joi from 'joi';
import { User } from 'src/Entity/User.entity';
import { UserDocument } from 'src/Schemas/User';
import Cloudinary from 'src/utils/cloudinary';
import { IFile } from 'src/utils/types/File';
import { rmSync } from 'fs';
import { NotificationsService } from 'src/globalservice/notifications/notifications.service';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notiService: NotificationsService,
  ) {}

  private coinCheck(coin: number): string {
    switch (coin) {
      case 1: {
        return 'Bitcoin';
      }
      case 2: {
        return 'Ethereum';
      }
      case 3: {
        return 'USDT';
      }
    }
  }

  public async getUserTransactions(
    user_id: string,
    query?: any,
  ): Promise<ReturnTypeInterfcae> {
    try {
      if (query) {
        const trans = await this.transactionModel.find({ user_id, ...query });
        if (trans.length < 1) {
          return Return({
            error: true,
            statusCode: 200,
            errorMessage: "You don't have any transactions",
            data: trans,
          });
        } else {
          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Transactions found',
            data: trans,
          });
        }
      }
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

  public async getAllTransactions(query?: {
    pending: boolean;
  }): Promise<ReturnTypeInterfcae> {
    try {
      if (query.pending) {
        const data = [];
        const trans = await this.transactionModel.find({ status: 1 });
        if (trans.length < 1) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: 'transaction not found',
          });
        }
        if (trans.length > 0) {
          for (let i = 0; i < trans.length; i++) {
            const user = await this.userModel.findById(trans[i].user_id);
            const newObj = { ...trans[i]['_doc'], user };
            data.push(newObj);
          }
          console.log(data);
          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Transaction found',
            data: data,
          });
        }
      }
      const data = [];
      const trans = await this.transactionModel.find({ status: { $gt: 1 } });
      if (trans.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'transaction not found',
        });
      }

      for (let i = 0; i < trans.length; i++) {
        const user = await this.userModel.findById(trans[i].user_id);
        const newObj = { ...trans[i]['_doc'], user };
        data.push(newObj);
      }
      console.log(data);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Transaction found',
        data: data,
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

  public async createTransaction(
    user_id: string,
    transactionDetails: Transaction,
  ): Promise<ReturnTypeInterfcae> {
    try {
      // check user
      const user = await this.userModel.findOne({ _id: user_id });
      if (user === null || user === undefined) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'user not found',
        });
      }

      transactionDetails.user_id = user_id;

      // if (transactionDetails.type === 1) {
      //   transactionDetails.coin_amount = 0;
      // } else {
      //   transactionDetails.amount = 0;
      // }

      const validationSchema = joi.object({
        user_id: joi.string().required(),
        coin_type: joi.number().max(3).min(1),
        amount: joi.number().optional(),
        coin_amount: joi.number().optional(),
        type: joi.number().required().min(1).max(2),
        USD: joi.string().required(),
        rate: joi.number().required(),
      });

      // validate
      const valStatus = validationSchema.validate(transactionDetails);
      if (valStatus.error) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: valStatus.error.message,
          trace: valStatus.error,
        });
      } else {
        // create the transaction
        const newTrans = await this.transactionModel.create(transactionDetails);
        // sent notification
        await this.notiService.transactionNoti(
          user_id,
          `Request to ${newTrans.type === 1 ? 'Buy' : 'Sell'} ${
            newTrans.coin_amount
          }  ${this.coinCheck(
            newTrans.coin_type,
          )} has been recieved and is been processed.`,
        );
        return Return({
          error: false,
          statusCode: 200,
          data: newTrans,
          successMessage: 'Transaction Created Successfully',
        });
      }
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

  public async uploadFiles(
    id: string,
    files: Array<IFile>,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const trans = await this.transactionModel.findOne({ _id: id });
      if (trans === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'transaction not found',
        });
      } else {
        const urls: string[] = [];
        //upload files
        for (let i = 0; i < files.length; i++) {
          const upload = await Cloudinary.uploader.upload(files[i].path, {
            folder: `/heritage`,
            transformation: {
              width: 600,
              height: 1080,
            },
          });
          urls.push(upload.secure_url);

          // delete the files
          const filesRem = await rmSync(files[i].path, { recursive: true });
        }

        console.log(urls);

        // updated transaction
        const updated = await this.transactionModel.updateOne(
          { _id: id },
          { proof_of_payment: urls },
        );

        console.log(updated);

        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Transaction created',
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

  async changeTransactionStatus(
    _id: string,
    status: any,
  ): Promise<ReturnTypeInterfcae> {
    if (status > 3 || status < 2) {
      return Return({
        error: true,
        statusCode: 400,
        errorMessage: 'Invalid Status code',
      });
    }
    try {
      const transaction = await this.transactionModel.findById(_id);
      if (transaction === null || transaction === undefined) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Transaction not found',
        });
      }

      if (transaction.status > 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Status already changed',
        });
      }

      const update = await this.transactionModel.updateOne({ _id }, { status });
      console.log(update);
      console.log(typeof status);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: `Status changed to ${
          parseInt(status) === 2 ? 'APPROVED' : 'DECLINED'
        }`,
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
