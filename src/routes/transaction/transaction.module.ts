import { Transaction, TransactionSchema } from 'src/Schemas/Transaction';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CrudService } from './sevrices/crud/crud.service';
import { User, UserSchema } from 'src/Schemas/User';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from 'src/globalservice/notifications/notifications.service';
import {
  NotificationSchema,
  Notification,
} from 'src/Schemas/Notification.schema';
import { Admin } from 'src/Entity/Admin.entity';
import { AdminSchema } from 'src/Schemas/Admin.Schema';
import { VerifyadminMiddleware } from 'src/middleware/verifyadmin.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [CrudService, NotificationsService],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyadminMiddleware).forRoutes({
      path: 'transaction/:id/:status',
      method: RequestMethod.PUT,
    });
  }
}
