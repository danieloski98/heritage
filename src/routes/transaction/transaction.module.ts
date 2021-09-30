import { Transaction, TransactionSchema } from 'src/Schemas/Transaction';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CrudService } from './sevrices/crud/crud.service';
import { User, UserSchema } from 'src/Schemas/User';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [CrudService],
})
export class TransactionModule {}
