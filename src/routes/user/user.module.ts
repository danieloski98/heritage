import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ProfileService } from './services/profile/profile.service';
import { AddressService } from './services/address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [ProfileService, AddressService],
})
export class UserModule {}
