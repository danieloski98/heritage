import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid'
import User from './User'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public address: string

  @column()
  public type: string

  // @column()
  // public private_key: string

  // @column()
  // public public_key: string

  // @column()
  // public address_id: string

  // assign id during creation
  @beforeCreate()
  public static assigid(wallet: Wallet) {
    wallet.id = uuid.v4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
