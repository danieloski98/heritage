import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PayPointDocument = Paypoint & Document;

export class IBank {
  @ApiProperty()
  bank_name: string;

  @ApiProperty()
  account_name: string;

  @ApiProperty()
  account_number: string;

  @ApiProperty()
  bank_code: string;

  @ApiProperty({
    description: 'can either be SAVINGS or CURRENT in uppercase',
  })
  account_type: 'SAVINGS' | 'CURRENT';
}

@Schema()
export class Paypoint {
  @ApiProperty()
  @Prop()
  bitcoin_wallet: string;

  @ApiProperty()
  @Prop()
  usdt_wallet: string;

  @ApiProperty()
  @Prop()
  etheruem_wallet: string;

  @ApiProperty()
  @Prop()
  rate: number;

  @ApiProperty({
    type: IBank,
  })
  @Prop({
    type: IBank,
  })
  bank: IBank;

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

export const PaypointSchema = SchemaFactory.createForClass(Paypoint);
