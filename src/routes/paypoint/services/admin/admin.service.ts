import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Paypoint, PayPointDocument } from 'src/Schemas/Paypoints.Schema';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
// import Pusher from 'src/utils/pusher';

@Injectable()
export class AdminService {
  private logger = new Logger();
  constructor(
    @InjectModel(Paypoint.name) private paypointModel: Model<PayPointDocument>,
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

  async updatePaypoint(data: Paypoint): Promise<ReturnTypeInterfcae> {
    try {
      // update Record
      const date = new Date().toISOString();
      data['updatedAt'] = date;
      const record = await this.paypointModel.updateMany(data);
      this.logger.log(record);
      //   Pusher.trigger('paypoint', 'update', record);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Paypoint updated',
        data: record,
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
