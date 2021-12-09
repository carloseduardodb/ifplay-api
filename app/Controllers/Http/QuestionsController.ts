import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from '../../Models/Question'
import Alternative from '../../Models/Alternative'

export default class QuestionsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, request }: HttpContextContract) {
    Question.create({
      title: request.all().title,
      quizId: request.all().quizId,
      teacherId: auth.user!.id,
    }).then((question) => {
      Alternative.create({
        questionId: question.id,
        isResponse: request.all().response.question1Rp,
        title: request.all().question1,
        teacherId: auth.user!.id,
      })
      Alternative.create({
        questionId: question.id,
        isResponse: request.all().question2Rp,
        title: request.all().question2,
        teacherId: auth.user!.id,
      })
      Alternative.create({
        questionId: question.id,
        isResponse: request.all().question3Rp,
        title: request.all().question3,
        teacherId: auth.user!.id,
      })
      Alternative.create({
        questionId: question.id,
        isResponse: request.all().question4Rp,
        title: request.all().question4,
        teacherId: auth.user!.id,
      })
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
