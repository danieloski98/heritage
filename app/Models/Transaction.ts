import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import { COINTYPE } from 'App/utils/enums/cointype-enum'
import { TRANSACTIONTYPE } from 'App/utils/enums/transaction_type-enum'
import { TRANSACTIONSTATUS } from 'App/utils/enums/Transaction-status-enum'
import uuid from 'uuid'
import User from './User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public type: TRANSACTIONTYPE

  @column()
  public coin_type: COINTYPE

  @column()
  public amount: number

  @column()
  public coin_amount: number

  @column()
  public proof_of_payment: string

  @column()
  public admin_proof_of_payment: string

  @column()
  public status: TRANSACTIONSTATUS

  @beforeCreate()
  public static assignid(transaction: Transaction) {
    transaction.id = uuid.v4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
