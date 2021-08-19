import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from './Chat.entity';

@Entity()
export class Message {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column({
    type: 'varchar',
  })
  chat_id: string;

  @ApiProperty({
    type: String,
  })
  @Column({
    type: 'varchar',
  })
  message: string;

  @ApiProperty({
    type: Boolean,
  })
  @Column({
    type: 'bool',
  })
  delivered: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Column({
    type: 'bool',
  })
  from_admin: boolean;

  @ApiProperty({
    type: String,
  })
  @Column({
    default: new Date().toISOString(),
  })
  public createdAt: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'chat_id' })
  chat: Chat;
}
