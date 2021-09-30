import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  first_name: string;

  @ApiProperty()
  @Prop()
  last_name: string;

  @ApiProperty()
  @Prop()
  referral_code: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  mobile_id: string;

  @ApiProperty()
  @Prop()
  web_id: string;

  @ApiProperty()
  @Prop()
  bitcoin_wallet: string;

  @ApiProperty()
  @Prop()
  ethereum_wallet: string;

  @ApiProperty()
  @Prop()
  usdt_wallet: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty()
  @Prop()
  updateAt: string;

  @ApiProperty()
  @Prop()
  isLoggedIn: boolean;

  @ApiProperty()
  @Prop()
  verified: boolean;

  @ApiProperty()
  @Prop()
  suspended: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
