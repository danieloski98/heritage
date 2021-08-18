import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  controllers: [BankController],
  providers: [CrudService]
})
export class BankModule {}
