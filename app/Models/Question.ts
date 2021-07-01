import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Quiz from './Quiz'
import Alternative from './Alternative'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public quizId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Quiz, {
    localKey: 'quizId',
  })
  public quiz: HasOne<typeof Quiz>

  @hasMany(() => Alternative, {
    foreignKey: 'questionId',
  })
  public alternatives: HasMany<typeof Alternative>
}
