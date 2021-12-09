import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne, scope } from '@ioc:Adonis/Lucid/Orm'
import Quiz from './Quiz'
import Alternative from './Alternative'
import Response from './Response'
import Teacher from './Teacher'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public teacherId: number

  @column()
  public quizId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getQuiz(teacher_id: number) {
    return Quiz.query().where('id', this.quizId).andWhere('teacher_id', teacher_id)
  }

  public getAlternatives(teacher_id: number) {
    return Alternative.query().where('question_id', this.id).andWhere('teacher_id', teacher_id)
  }

  public getResponses(teacher_id: number) {
    return Response.query().where('question_id', this.id).andWhere('teacher_id', teacher_id)
  }

  @hasMany(() => Alternative, {
    foreignKey: 'questionId',
  })
  public alternatives: HasMany<typeof Alternative>
}
