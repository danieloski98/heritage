import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  hasMany,
  HasMany,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
// import uuid from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import { uuid } from 'uuidv4'

// relationship tables
import Bank from 'App/Models/Bank'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public verified: boolean

  @column()
  public suspended: boolean

  @column()
  public isLoggedIn: boolean

  @column()
  public deveice_id: string

  @column()
  public bitcoin_wallet: string

  @column()
  public ethereum_wallet: string

  @column()
  public usdt_wallet: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @hasMany(() => Bank)
  public banks: HasMany<typeof Bank>

  // before creation hook
  @beforeCreate()
  public static assignid(user: User) {
    user.id = uuid()
  }

  // before save hook
  @beforeSave()
  public static async hashpassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
