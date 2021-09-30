import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bank } from './Bank.entity';
import { Referral } from './Referral.entity';
import { Transaction } from './Transactions.entity';
import { Wallet } from './Wallet.entity';

@Entity()
export class User {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public email: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public first_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public last_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public password: string;

  @ApiProperty({
    type: Boolean,
  })
  @Column({ default: false })
  public verified: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Column({ default: false })
  public suspended: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Column({ default: false })
  public isLoggedIn: boolean;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  public deveice_id: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  public bitcoin_wallet: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  public ethereum_wallet: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  public usdt_wallet: string;

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
  @Column({ nullable: true })
  referral_code: string;

  // relationships
  @OneToMany(() => Bank, (bank) => bank.user, {
    cascade: ['insert', 'remove', 'update'],
  })
  banks: Bank[];

  @OneToMany(() => Wallet, (wallet) => wallet.user, {
    cascade: ['update', 'insert', 'remove'],
  })
  wallets: Wallet[];

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: ['update', 'insert', 'remove'],
  })
  transactions: Transaction[];

  @OneToMany(() => Referral, (referral) => referral.user, {
    cascade: ['update', 'insert', 'remove'],
  })
  referrals: Referral[];
}
