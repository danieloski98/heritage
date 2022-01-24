import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
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
  phone: string;

  @ApiProperty({
    type: Number,
  })
  @Prop({
    required: false,
    default: 1,
  })
  role: number;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    required: false,
    default: false,
  })
  isSuperAdmin: boolean;

  @ApiProperty()
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    default: new Date().toISOString(),
  })
  public createdAt: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    default: new Date().toISOString(),
  })
  public updatedAt: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
