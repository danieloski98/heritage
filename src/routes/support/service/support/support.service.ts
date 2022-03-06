import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Support, SupportDocument } from 'src/Schemas/Support.Schema';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<SupportDocument>,
  ) {}

  async createSupport(message: Support): Promise<ReturnTypeInterfcae> {
    try {
      const newMessage = await this.supportModel.create(message);
      console.log(newMessage);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Message recieved',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async getSupport(): Promise<ReturnTypeInterfcae> {
    try {
      const Messages = await this.supportModel.find();
      console.log(Messages);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Message',
        data: Messages,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
