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
  @Prop({
    default: '',
  })
  mobile_id: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
  web_id: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
  bitcoin_wallet: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
  ethereum_wallet: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
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
  @Prop({
    default: false,
  })
  isLoggedIn: boolean;

  @ApiProperty()
  @Prop({
    default: false,
  })
  verified: boolean;

  @ApiProperty()
  @Prop({
    default: false,
  })
  suspended: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
