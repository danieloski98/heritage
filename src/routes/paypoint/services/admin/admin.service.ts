import { HttpService } from '@nestjs/axios';
import { Get, Injectable, Logger, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { CrudService } from 'src/routes/admins/services/crud/crud.service';
import { Paypoint, PayPointDocument } from 'src/Schemas/Paypoints.Schema';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// import Pusher from 'src/utils/pusher';

@Injectable()
export class AdminService {
  private logger = new Logger();
  constructor(
    @InjectModel(Paypoint.name) private paypointModel: Model<PayPointDocument>,
    private httpService: HttpService,
  ) {}

  async createPaypoint(data: Paypoint): Promise<ReturnTypeInterfcae> {
    try {
      const paypointExist = await this.paypointModel.find();
      if (paypointExist.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Paypoint already exist, try updating instead',
        });
      } else {
        // create new paypoint
        const record = await this.paypointModel.create(data);
        this.logger.log(record);
        // Pusher.trigger('paypoint', 'update', record);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Paypoint created',
          data: record,
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

  async updatePaypoint(
    data: Paypoint | any,
    bank?: number,
  ): Promise<ReturnTypeInterfcae> {
    try {
      // update Record
      const date = new Date().toISOString();
      data['updatedAt'] = date;
      const record = await this.paypointModel.updateMany({
        ...data,
        updatedAt: date,
      });
      this.logger.log(record);
      //   Pusher.trigger('paypoint', 'update', record);
      const notificationTrigger = this.httpService.post(
        process.env.NOTIFICATION_URL,
        {
          appId: process.env.NOTIFICATION_APP_ID,
          appToken: process.env.NOTIFICATION_APP_TOKEN,
          title: bank ? 'Bank Account Changed' : 'Rate and Wallet Updated!',
          body: bank
            ? 'Bank Account updated'
            : `The Buying And Selling Rate has changed, please login to the app to see the new Rate`,
          dateSent: new Date().toDateString(),
        },
      );

      notificationTrigger.subscribe({
        next: function (data) {
          console.log(data.data);
        },
        error: function (error) {
          console.log(error);
        },
        complete: () => {
          console.log('Completed notification Posting');
        },
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Paypoint updated',
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
