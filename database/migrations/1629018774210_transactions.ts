import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.integer('type').notNullable()
      table.integer('coin_type').notNullable()
      table.integer('amount').nullable()
      table.integer('coin_amount').nullable()
      table.string('proof_of_payment').nullable()
      table.string('admin_proof_of_payment').nullable()
      table.integer('status', 1)
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
