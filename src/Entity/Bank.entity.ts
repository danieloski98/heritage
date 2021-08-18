import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Bank {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public user_id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public bank_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public account_type: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public account_number: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public createdAt: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public updatedAt: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  referral_code: string;

  // relationship
  @ManyToOne(() => User, (user) => user.banks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
