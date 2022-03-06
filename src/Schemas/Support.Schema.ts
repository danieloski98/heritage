import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SupportDocument = Support & Document;

@Schema()
export class Support {
  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  fullname: string;

  @ApiProperty()
  @Prop({
    require: true,
  })
  message: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    default: new Date().toISOString(),
  })
  public createdAt: string;
}

export const SupportSchema = SchemaFactory.createForClass(Support);
