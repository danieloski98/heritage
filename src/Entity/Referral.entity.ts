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
export class Referral {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  referral_id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public user_id: string;

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

  // relationship
  @ManyToOne(() => User, (user) => user.referrals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'referral_id', referencedColumnName: 'id' })
  user: User;
}
