import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Paypoint, PayPointDocument } from 'src/Schemas/Paypoints.Schema';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import Pusher from 'src/utils/pusher';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    @InjectModel(Paypoint.name) private paypointModel: Model<PayPointDocument>,
  ) {}

  async getPaypoint(): Promise<ReturnTypeInterfcae> {
    try {
      const paypoint = await this.paypointModel.find();
      return Return({
        error: false,
        statusCode: 200,
        data: paypoint[0],
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
