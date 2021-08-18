import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CrudService } from './sevrices/crud/crud.service';

@Module({
  controllers: [TransactionController],
  providers: [CrudService]
})
export class TransactionModule {}
