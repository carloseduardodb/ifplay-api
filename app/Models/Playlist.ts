import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'
import Video from './Video'
import Quiz from './Quiz'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public quizId: number

  @column()
  public teacherId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public teacher: Teacher

  @hasOne(() => Quiz, {
    localKey: 'quizId',
  })
  public quiz: HasOne<typeof Quiz>

  @hasMany(() => Video, {
    foreignKey: 'playlistId',
  })
  public videos: HasMany<typeof Video>

  async getCountAll(teacher_id: number) {
    const videos = await Database.query().from('videos').where('playlist_id', this.id).count({
      count: '*',
    })
    const questions = await Database.query()
      .from('questions')
      .innerJoin('quizzes', 'quizzes.id', 'questions.quiz_id')
      .innerJoin('playlists', 'quizzes.id', 'playlists.quiz_id')
      .where('playlists.id', this.id)
      .andWhere('questions.teacher_id', teacher_id)
      .count({
        count: '*',
      })
    const teams = await Database.query()
      .from('teams')
      .innerJoin('quizzes', 'quizzes.id', 'teams.quiz_id')
      .innerJoin('playlists', 'quizzes.id', 'playlists.quiz_id')
      .where('playlists.id', this.id)
      .andWhere('teams.teacher_id', teacher_id)
      .count({
        count: '*',
      })
    const responses = await Database.query()
      .from('responses')
      .innerJoin('questions', 'questions.id', 'responses.question_id')
      .innerJoin('quizzes', 'quizzes.id', 'questions.quiz_id')
      .innerJoin('playlists', 'playlists.quiz_id', 'quizzes.id')
      .where('playlists.id', this.id)
      .andWhere('responses.teacher_id', teacher_id)
      .count({
        count: '*',
      })

    return {
      videos: videos[0].count,
      questions: questions[0].count,
      teams: teams[0].count,
      answers: responses[0].count,
    }
  }

  getQuiz(teacher_id: number) {
    return Quiz.query().where('id', this.quizId).andWhere('teacher_id', teacher_id).first()
  }

  getQuizNoAuth() {
    return Quiz.query().where('id', this.quizId).first()
  }
}
