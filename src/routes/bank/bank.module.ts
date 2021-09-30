import { Module } from '@nestjs/common';
import { BankController } from './bank/bank.controller';
import { CrudService } from './services/crud/crud.service';
import { User, UserSchema } from 'src/Schemas/User';
import { Bank } from 'src/Schemas/Bank';
import { MongooseModule } from '@nestjs/mongoose';
import { BankSchema } from 'src/Schemas/Bank';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bank.name, schema: BankSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [BankController],
  providers: [CrudService],
})
export class BankModule {}
