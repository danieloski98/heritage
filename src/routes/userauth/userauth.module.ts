import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Referral } from 'src/Entity/Referral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Referral])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserauthModule {}
