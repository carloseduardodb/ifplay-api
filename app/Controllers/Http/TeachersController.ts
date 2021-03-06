import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateTeacherService from 'App/Services/CreateTeacherService'
import CreateTeacher from 'App/Validators/CreateTeacherValidator'
import Teacher from '../../Models/Teacher'
import Hash from '@ioc:Adonis/Core/Hash'

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
      .countDistinct({
        total: 'email',
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
      .andWhere('created_at', '>', await this.getDate(30))
      .count({
        total: 'id',
      })
    const answersCount2 = await Database.from('questions')
      .where('teacher_id', auth.user!.id)
      .andWhere('created_at', '>', await this.getDate(60))
      .andWhere('created_at', '<', await this.getDate(30))
      .count({
        total: 'id',
      })

    const answersCount = answersCount1[0].total - answersCount2[0].total

    const responses = await Database.from((subQuery) => {
      return subQuery
        .from('questions')
        .innerJoin('responses', 'questions.id', 'responses.question_id')
        .where('responses.status', '=', true)
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
          .where('responses.status', '=', false)
          .andWhere('questions.teacher_id', auth.user!.id)
          .count({
            erros: '*',
          })
          .as('erros')
      })
      .from('responses')
      .rightJoin('questions', 'responses.question_id', 'questions.id')
      .where('responses.status', true)
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

  /* compara se email anterior é igual ao email atual e se for atualiza o email */
  public async updateEmail({ request, response, auth }: HttpContextContract) {
    const { email, newEmail } = request.all()
    const teacher = await Teacher.find(auth.user!.id)
    if (teacher) {
      if (teacher.email === email) {
        if (teacher.email === newEmail) {
          return response.status(409).send({
            message: 'Email já cadastrado',
          })
        }
        teacher.email = newEmail
        await teacher.save()
        return response.status(200).send({
          message: 'Email atualizado com sucesso',
        })
      }
    }
    return response.status(406).send({
      message: 'Erro ao atualizar email, verifique se os dados estão corretos',
    })
  }

  // compara se senha anterior é igual a senha atual e atualiza a senha
  public async updatePassword({ request, response, auth }: HttpContextContract) {
    const teacher = await Teacher.findBy('id', auth.user!.id)
    if (teacher) {
      if (await Hash.verify(teacher.password, request.all().password)) {
        teacher.password = await request.all().newPassword
        await teacher.save()
        return response.status(200).send({
          message: 'Senha atualizada com sucesso',
        })
      } else {
        return response.status(409).send({
          message: 'Senha atual incorreta',
        })
      }
    }
  }

  //apagar conta do professor
  public async destroy({ response, auth }: HttpContextContract) {
    const teacher = await Teacher.findBy('id', auth.user!.id)
    if (teacher) {
      await teacher.delete()
      return response.status(200).send({
        message: 'Conta deletada com sucesso',
      })
    }
    return response.status(406).send({
      message: 'Erro ao deletar conta',
    })
  }
}
