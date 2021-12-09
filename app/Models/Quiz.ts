import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne, scope } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Teacher from './Teacher'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public teacherId: number

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Question, {
    foreignKey: 'quizId',
  })
  public questions: HasMany<typeof Question>
}
