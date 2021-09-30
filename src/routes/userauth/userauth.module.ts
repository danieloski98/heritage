import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as MongoUser, UserSchema } from 'src/Schemas/User';
import { Referral as Ref, ReferralSchema } from 'src/Schemas/Referral';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: Ref.name, schema: ReferralSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserauthModule {}
