import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from '../../Models/Question'
import Alternative from '../../Models/Alternative'
import Response from '../../Models/Response'
import Team from '../../Models/Team'

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

  public async saveAnswer({ request, response }: HttpContextContract) {
    const { responses, email, code, name } = request.all()

    //saber se o código é valido
    const itsValid = await Team.findBy('code', code)

    if (!itsValid) {
      return response.json({
        message: 'Código inválido!',
      })
    }

    //percorrer respostas e salvar as que forem certas como hit e as que forem falsas como error
    const alt = await Alternative.findBy('id', responses[0].alternaId)

    responses.forEach((response) => {
      Response.create({
        student: name,
        questionId: response.questionId,
        status: response.response,
        email: email,
        teacherId: alt?.teacherId,
        code: code,
      })
    })

    return response.json({
      message: 'Respostas enviadas para o professor com sucesso!',
    })
  }
}
