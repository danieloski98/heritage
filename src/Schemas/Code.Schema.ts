import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CodeDocument = Code & Document;

@Schema()
export class Code {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  code: number;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toUTCString(),
  })
  created_at: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
