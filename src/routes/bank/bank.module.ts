import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { CrudService } from './services/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Bank } from 'src/Entity/Bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bank])],
  controllers: [BankController],
  providers: [CrudService],
})
export class BankModule {}
