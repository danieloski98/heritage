import { Transaction } from './../../Entity/Transactions.entity';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CrudService } from './sevrices/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [TransactionController],
  providers: [CrudService],
})
export class TransactionModule {}
