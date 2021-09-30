import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { COINTYPE } from 'src/utils/enums/cointype-enum';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  address: string;

  @ApiProperty()
  @Prop({
    enum: COINTYPE,
  })
  type: number;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty()
  @Prop()
  updateAt: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
