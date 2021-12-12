import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public student: string

  @column()
  public questionId: number

  @column()
  public teacherId: number

  @column()
  public code: string

  @column()
  public status: boolean

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
