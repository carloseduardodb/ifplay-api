import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, scope } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public student: string

  @column()
  public playlistId: number

  @column()
  public question: number

  @column()
  public teacherId: number

  @column()
  public status: boolean

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
