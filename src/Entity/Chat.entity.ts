import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './Message.entity';

@Entity()
export class Chat {
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
  user_id: string;

  @ApiProperty({
    type: String,
  })
  @Column({
    default: new Date().toISOString(),
  })
  public createdAt: string;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: ['insert', 'remove', 'update'],
  })
  messages: Message[];
}
