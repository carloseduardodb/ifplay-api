import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Playlists extends BaseSchema {
  protected tableName = 'playlists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('quiz_id').unsigned().references('id').inTable('quizzes').onDelete('CASCADE')
      table
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('teachers')
        .onDelete('CASCADE')
        .notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
