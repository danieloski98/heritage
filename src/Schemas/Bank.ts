import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BankDocument = Bank & Document;

@Schema()
export class Bank {
  @Prop()
  user_id: string;

  @Prop()
  bank_name: string;

  @Prop()
  account_name: string;

  @Prop()
  account_type: string;

  @Prop()
  account_number: string;

  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  updateAt: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
