import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Response from '../../Models/Response'

export default class AnswersController {
  public async index({}: HttpContextContract) {}

  public async countAll({ auth }: HttpContextContract) {
    const count = await Database.from('responses').where('teacher_id', auth.user!.id).count({
      count: '*',
    })
    return count
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
