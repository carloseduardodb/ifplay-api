import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import Video from './Video'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public teacherId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Teacher, {
    localKey: 'teacherId',
  })
  public teacher: HasOne<typeof Teacher>

  @hasMany(() => Video, {
    foreignKey: 'playlistId',
  })
  public videos: HasMany<typeof Video>
}
