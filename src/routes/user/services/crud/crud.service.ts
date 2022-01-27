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

  async updateUser(_id: string, details: User): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const update = await this.userModel.updateOne({ _id }, { ...details });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User account updated',
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
