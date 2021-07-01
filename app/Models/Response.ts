import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public playlistId: number

  @column()
  public question: number

  @column()
  public status: boolean

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
