import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Alternative extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public questionId: number

  @column()
  public isResponse: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Question, {
    localKey: 'questionId',
  })
  public question: HasOne<typeof Question>
}
