import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Banks extends BaseSchema {
  protected tableName = 'Banks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('bank_name')
      table.string('account_type')
      table.string('account_number')
      table.string('user_id').references('users.id').onDelete('CASCADE')
      table.string('created_at')
      table.string('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
