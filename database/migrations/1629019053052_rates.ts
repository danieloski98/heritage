import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rates extends BaseSchema {
  protected tableName = 'rates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('coin')
      table.integer('rate')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('created_at')
      table.string('updated_at')
      // table.timestamp('created_at', { useTz: false })
      // table.timestamp('updated_at', { useTz: false })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
