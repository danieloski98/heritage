import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as MongoUser, UserSchema } from 'src/Schemas/User';
import { Referral as Ref, ReferralSchema } from 'src/Schemas/Referral';
import { Code, CodeSchema } from 'src/Schemas/Code.Schema';
import {
  ForgotPasswordOTP,
  ForgotPasswordOTPSchema,
} from 'src/Schemas/ForgotpasswordCode.schema';
import { EmailService } from 'src/globalservice/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: Ref.name, schema: ReferralSchema },
      { name: Code.name, schema: CodeSchema },
      { name: ForgotPasswordOTP.name, schema: ForgotPasswordOTPSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class UserauthModule {}
