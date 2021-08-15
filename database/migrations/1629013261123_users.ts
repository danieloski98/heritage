import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email')
      table.string('first_name')
      table.string('last_name')
      table.string('password')
      table.boolean('verified')
      table.boolean('suspended')
      table.boolean('isLoggedIn')
      table.string('device_id')
      table.string('bitcoin_wallet')
      table.string('ethereum_wallet')
      table.string('usdt_wallet')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('created_at')
      table.string('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
