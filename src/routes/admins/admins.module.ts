import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema, Admin } from 'src/Schemas/Admin.Schema';
import { Transaction, TransactionSchema } from 'src/Schemas/Transaction';
import { User, UserSchema } from 'src/Schemas/User';
import { AdminsController } from './admins.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [CrudService],
})
export class AdminsModule {}
