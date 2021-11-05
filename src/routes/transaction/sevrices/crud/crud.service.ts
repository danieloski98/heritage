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
        // await this.notiService.transactionNoti(user_id, 'Transaction created');
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
          const upload = await Cloudinary.uploader.upload(files[i].path);
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
}
