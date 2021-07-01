import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Playlist from './Playlist'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public playlistId: number

  @column()
  public url: string

  @column()
  public views: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Playlist, {
    localKey: 'playlistId',
  })
  public playlist: HasOne<typeof Playlist>
}
