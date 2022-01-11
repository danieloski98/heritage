import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { COINTYPE } from 'src/utils/enums/cointype-enum';
import { TRANSACTIONSTATUS } from 'src/utils/enums/Transaction-status-enum';
import { TRANSACTIONTYPE } from 'src/utils/enums/transaction_type-enum';
import { IFile } from 'src/utils/types/File';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  user_id: string;

  @ApiProperty({
    type: Number,
    description: 'A array containing all the file objects not string',
  })
  @Prop({
    required: false,
  })
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'the amount of the coin the user is getting',
  })
  @Prop({
    required: false,
  })
  coin_amount: number;

  @ApiProperty({
    type: Array,
    description: 'A array containing all the file objects not string',
  })
  @Prop({
    required: true,
    type: [String],
  })
  proof_of_payment: string[];

  @ApiProperty({
    type: Array,
    description: 'A array containing all the file objects not string',
  })
  @Prop({
    required: false,
  })
  admin_proof_of_payment: string;

  @ApiProperty({
    enum: TRANSACTIONTYPE,
  })
  @Prop({
    enum: TRANSACTIONTYPE,
    type: Number,
  })
  type: TRANSACTIONTYPE;

  @ApiProperty({
    enum: COINTYPE,
  })
  @Prop({
    enum: COINTYPE,
  })
  coin_type: COINTYPE;

  @ApiProperty({
    enum: TRANSACTIONSTATUS,
  })
  @Prop({
    enum: TRANSACTIONSTATUS,
    default: 1,
  })
  status: number;

  @ApiProperty({
    type: String,
    default: new Date().toISOString(),
  })
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  public createdAt: string;

  @ApiProperty({
    type: String,
    default: new Date().toISOString(),
  })
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  public updatedAt: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
