import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';
import { COINTYPE } from 'src/utils/enums/cointype-enum';
import { TRANSACTIONSTATUS } from 'src/utils/enums/Transaction-status-enum';
import { TRANSACTIONTYPE } from './../utils/enums/transaction_type-enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
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
  @Column({ nullable: true })
  public amount: number;

  @ApiProperty({
    type: Number,
  })
  @Column({ nullable: true })
  public coin_amount: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  public proof_of_payment: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public admin_proof_of_payment: string;

  @ApiProperty({
    enum: TRANSACTIONTYPE,
  })
  @Column({
    type: 'enum',
    enum: TRANSACTIONTYPE,
    nullable: false,
  })
  public type: TRANSACTIONTYPE;

  @ApiProperty({
    enum: COINTYPE,
  })
  @Column({
    type: 'enum',
    enum: COINTYPE,
    nullable: false,
  })
  public coins_type: COINTYPE;

  @ApiProperty({
    enum: TRANSACTIONSTATUS,
  })
  @Column({
    type: 'enum',
    enum: TRANSACTIONSTATUS,
    nullable: false,
  })
  public status: TRANSACTIONSTATUS;

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
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
