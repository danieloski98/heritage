import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcrypt';
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

  async createPin(_id: string, pin: string): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const salt = await genSalt();
      const hashPin = await hash(pin, salt);
      const update = await this.userModel.updateOne({ _id }, { pin: hashPin });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'pin created updated',
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

  async verifyPin(_id: string, pin: string): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const match = await compare(pin, user.pin);
      if (!match) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Pin does not match',
        });
      } else {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Pin match',
        });
      }
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
