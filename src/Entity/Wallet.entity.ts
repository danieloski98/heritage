import { ApiProperty } from '@nestjs/swagger';
import { COINTYPE } from 'src/utils/enums/cointype-enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Wallet {
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
  public address: string;

  @ApiProperty({
    enum: COINTYPE,
  })
  @Column()
  public type: COINTYPE;

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
