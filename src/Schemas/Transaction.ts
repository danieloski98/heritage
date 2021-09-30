import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { COINTYPE } from 'src/utils/enums/cointype-enum';
import { TRANSACTIONSTATUS } from 'src/utils/enums/Transaction-status-enum';
import { TRANSACTIONTYPE } from 'src/utils/enums/transaction_type-enum';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  user_id: string;

  @Prop()
  amount: number;

  @Prop()
  coin_amount: number;

  @Prop()
  proof_of_payment: string;

  @Prop()
  admin_proof_of_payment: string;

  @Prop({
    enum: TRANSACTIONTYPE,
  })
  type: TRANSACTIONTYPE;

  @Prop({
    enum: COINTYPE,
  })
  coins_type: COINTYPE;

  @Prop({
    enum: TRANSACTIONSTATUS,
    default: 1,
  })
  status: number;

  @ApiProperty({
    type: String,
  })
  @Prop()
  public createdAt: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  public updatedAt: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
