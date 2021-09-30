import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  price: number;

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

export const RateSchema = SchemaFactory.createForClass(Rate);
