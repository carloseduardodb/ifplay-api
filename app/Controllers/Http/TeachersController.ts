import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateTeacherService from 'App/Services/CreateTeacherService'
import CreateTeacher from 'App/Validators/CreateTeacherValidator'

export default class TeachersController {
  public async create({ request, response }: HttpContextContract) {
    await request.validate(CreateTeacher)
    const createTeacherService = new CreateTeacherService()
    const status = await createTeacherService.execute(request)
    if (status === true) {
      return response.status(201).send({
        message: 'Sucesso ao criar nova conta!',
      })
    } else {
      return response.status(409)
    }
  }

  //funcao que subtrai 30 dias da data atual
  public async getDate(days: number = 30) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date
  }

  public async indexDashboard({ auth }: HttpContextContract) {
    // pega todas as respostas referente ao mes atual
    const responsesCount = await Database.from('responses')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '>', await this.getDate())
      .count({
        total: 'id',
      })

    // soma todos os emails das respostas referentes ao mes atual
    const emailsCount = await Database.from('responses')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '>', await this.getDate())
      .count({
        total: 'id',
      })

    // soma todas as playlists criadas no ultimo mes
    const playlistsCount = await Database.from('playlists')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '>', await this.getDate())
      .count({
        total: 'id',
      })

    // o calculo da diferença da quantidade de perguntas entre o mes atual e o mes anterior
    const answersCount1 = await Database.from('questions')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '>', await this.getDate(60))
      .andWhere('created_at', '<', await this.getDate(30))
      .count({
        total: 'id',
      })
    const answersCount2 = await Database.from('questions')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '<', await this.getDate(30))
      .count({
        total: 'id',
      })

    const answersCount = answersCount1[0].total - answersCount2[0].total

    const responses = await Database.from((subQuery) => {
      return subQuery
        .from('questions')
        .innerJoin('responses', 'questions.id', 'responses.question_id')
        .where('responses.status', '=', 'acerto')
        .andWhere('questions.teacher_id', auth.user!.id)
        .count({
          acertos: '*',
        })
        .as('acertos')
    })
      .from((subQuery) => {
        return subQuery
          .from('questions')
          .innerJoin('responses', 'questions.id', 'responses.question_id')
          .where('responses.status', '=', 'erro')
          .andWhere('questions.teacher_id', auth.user!.id)
          .count({
            erros: '*',
          })
          .as('erros')
      })
      .from('responses')
      .rightJoin('questions', 'responses.question_id', 'questions.id')
      .where('responses.status', 'acerto')
      .andWhere('questions.teacher_id', auth.user!.id)
      .limit(10)

    return {
      responsesCount: responsesCount[0].total,
      emailsCount: emailsCount[0].total,
      playlistsCount: playlistsCount[0].total,
      answersCount: answersCount,
      lastResponses: [...responses],
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
