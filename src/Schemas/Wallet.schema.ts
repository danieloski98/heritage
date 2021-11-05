import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COINTYPE } from 'src/utils/enums/cointype-enum';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop()
  user_id: string;

  @Prop()
  address: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  locked: boolean;

  @Prop({
    enum: COINTYPE,
    required: true,
  })
  type: number;

  @Prop({
    type: Number,
    default: 0,
  })
  balance: number;

  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
