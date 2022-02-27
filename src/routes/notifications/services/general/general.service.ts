import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/Schemas/Admin.Schema';
import {
  Notification,
  NotificationDocument,
} from 'src/Schemas/Notification.schema';
import { User, UserDocument } from 'src/Schemas/User';
import { ReturnTypeInterfcae, Return } from 'src/utils/types/returnType';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async createNotification(
    user_id: string,
    user_type: number,
    message: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      if (user_type === 1) {
        // check if the user exist
        const user = await this.userModel.findById(user_id);
        if (user === null || user === undefined) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: 'User not found',
          });
        }
        // create notification
        const noti = {
          user_id,
          user_type,
          message,
        };

        const newNoti = await this.notificationModel.create(noti);
        console.log(newNoti);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Notification created successfully',
          data: newNoti,
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

  async markAsRead(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const noti = await this.notificationModel.findById(id);
      if (noti === null || noti === undefined) {
        return Return({
          error: false,
          statusCode: 400,
          errorMessage: 'Not found',
        });
      }
      const update = await this.notificationModel.updateOne(
        { _id: id },
        { read: true },
      );
      console.log(update);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Marked as read',
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

  async getUserNotification(user_id): Promise<ReturnTypeInterfcae> {
    try {
      const notis = await this.notificationModel.find({ user_id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Success',
        data: notis,
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

  async getAdminNotification(): Promise<ReturnTypeInterfcae> {
    try {
      const notis = await this.notificationModel.find({ user_type: 2 });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Success',
        data: notis,
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

  async deleteNoti(_id: string): Promise<ReturnTypeInterfcae> {
    try {
      const notis = await this.notificationModel.deleteOne({ _id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Success',
        data: notis,
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
