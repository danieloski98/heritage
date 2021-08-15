import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wallets extends BaseSchema {
  protected tableName = 'wallets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      // table.string('user_id')
      table.string('address')
      table.string('type')

      table.string('user_id').references('users.id').onDelete('CASCADE')

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
