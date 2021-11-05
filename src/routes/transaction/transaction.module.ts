import { Transaction, TransactionSchema } from 'src/Schemas/Transaction';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CrudService } from './sevrices/crud/crud.service';
import { User, UserSchema } from 'src/Schemas/User';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from 'src/globalservice/notifications/notifications.service';
import {
  NotificationSchema,
  Notification,
} from 'src/Schemas/Notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [CrudService, NotificationsService],
})
export class TransactionModule {}
