import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid'

// relationship
import User from 'App/Models/User'

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public bank_name: string

  @column()
  public account_type: string

  @column()
  public account_number: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // before create

  @beforeCreate()
  public static assignid(bank: Bank) {
    bank.id = uuid.v4()
  }
}
