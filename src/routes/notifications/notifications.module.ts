import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin } from 'src/Entity/Admin.entity';
import { AdminSchema } from 'src/Schemas/Admin.Schema';
import {
  NotificationSchema,
  Notification,
} from 'src/Schemas/Notification.schema';
import { User, UserSchema } from 'src/Schemas/User';
import { NotificationsController } from './notifications.controller';
import { GeneralService } from './services/general/general.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [GeneralService],
  exports: [GeneralService],
})
export class NotificationsModule {}
