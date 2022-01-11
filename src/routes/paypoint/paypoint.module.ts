import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin } from 'src/Entity/Admin.entity';
import { User } from 'src/Entity/User.entity';
import { VerifyadminMiddleware } from 'src/middleware/verifyadmin.middleware';
import { AdminSchema } from 'src/Schemas/Admin.Schema';
import { Paypoint, PaypointSchema } from 'src/Schemas/Paypoints.Schema';
import { UserSchema } from 'src/Schemas/User';
import { PaypointController } from './paypoint.controller';
import { AdminService } from './services/admin/admin.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Paypoint.name, schema: PaypointSchema },
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [PaypointController],
  providers: [AdminService, UserService],
})
export class PaypointModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyadminMiddleware)
      .forRoutes(
        { path: 'paypoint', method: RequestMethod.PUT },
        { path: 'paypoint/create', method: RequestMethod.POST },
      );
  }
}
