import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/User';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';

@Injectable()
export class CrudService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<ReturnTypeInterfcae> {
    try {
      const users = await this.userModel.find();
      return Return({
        error: false,
        statusCode: 200,
        data: users,
        successMessage: 'Users found',
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
