import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  message: string;

  @ApiProperty()
  @Prop()
  user_type: number;

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: false,
  })
  read: boolean;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
