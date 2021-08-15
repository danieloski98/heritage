import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { COINTYPE } from 'App/utils/enums/cointype-enum'

export default class Rate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public coin: COINTYPE

  @column()
  public rate: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
