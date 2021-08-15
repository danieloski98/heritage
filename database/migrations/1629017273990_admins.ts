import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Admins extends BaseSchema {
  protected tableName = 'admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email')
      table.string('first_name')
      table.string('last_name')
      table.string('password')
      table.integer('role')

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
