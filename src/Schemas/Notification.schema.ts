import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop()
  user_id: string;

  @Prop()
  message: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  read: boolean;

  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createdAt: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
