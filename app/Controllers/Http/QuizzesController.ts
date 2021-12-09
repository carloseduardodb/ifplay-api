import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quiz from '../../Models/Quiz'

export default class QuizzesController {
  public async index({ params }: HttpContextContract) {
    const quiz = await Quiz.find(params.id)
    return quiz
  }

  public async create({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { title } = await request.all()
    const quiz = await Quiz.find(params.id)
    if (quiz) {
      quiz.title = title
      await quiz.save()
    }

    return response.status(200).json(quiz)
  }

  public async destroy({}: HttpContextContract) {}
}
