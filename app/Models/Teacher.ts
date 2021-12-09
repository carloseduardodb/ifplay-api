import { DateTime } from 'luxon'
import Playlist from './Playlist'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(teacher: Teacher) {
    if (teacher.$dirty.password) {
      teacher.password = await Hash.make(teacher.password)
    }
  }

  @hasMany(() => Playlist, {
    foreignKey: 'teacherId',
  })
  public playlist: HasMany<typeof Playlist>
}
