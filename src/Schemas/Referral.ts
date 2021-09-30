import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ReferralDocument = Referral & Document;

@Schema()
export class Referral {
  @ApiProperty()
  @Prop()
  referral_id: string;

  @ApiProperty()
  @Prop()
  user_id: string;

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

export const ReferralSchema = SchemaFactory.createForClass(Referral);
