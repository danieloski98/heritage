import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationDocument,
  Notification,
} from 'src/Schemas/Notification.schema';
import { User, UserDocument } from 'src/Schemas/User';
import Firebase from 'src/utils/firebase';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async transactionNoti(
    user_id: string,
    text: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id: user_id });
      // send notification
      const newNoti = await this.notificationModel.create({
        user_id,
        message: text,
      });

      if (user) {
        const noti = await Firebase.messaging().sendToDevice(user.mobile_id, {
          notification: {
            title: 'Transaction Status',
            body: text,
          },
        });

        if (noti.successCount > 0) {
          console.log('Notification sent');
        } else if (noti.failureCount > 0) {
          console.log('Notification not sent');
        }
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
