import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ProfileService } from './services/profile/profile.service';
import { AddressService } from './services/address/address.service';
import { User as MongoUser, User, UserSchema } from 'src/Schemas/User';
import { MongooseModule } from '@nestjs/mongoose';
import { BankSchema, Bank } from 'src/Schemas/Bank';
import { TransactionSchema, Transaction } from 'src/Schemas/Transaction';
import { WalletSchema, Wallet } from 'src/Schemas/Wallet';
import { NotificationsService } from './services/notifications/notifications.service';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Bank.name, schema: BankSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    ProfileService,
    AddressService,
    NotificationsService,
    CrudService,
  ],
})
export class UserModule {}
