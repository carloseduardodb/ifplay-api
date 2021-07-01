import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Playlist from './Playlist'
import Question from './Question'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public playlistId: number

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Playlist, {
    localKey: 'playlistId',
    foreignKey: 'id',
  })
  public playlist: HasOne<typeof Playlist>

  @hasMany(() => Question, {
    foreignKey: 'quizId',
  })
  public questions: HasMany<typeof Question>
}
