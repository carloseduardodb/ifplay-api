import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from '../../Models/Team'
import { v4 as uuidv4 } from 'uuid'

export default class TeamsController {
  public async index({}: HttpContextContract) {
    return await Team.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, auth }: HttpContextContract) {
    Team.create({
      ...request.all(),
      code: uuidv4(),
      teacherId: auth.user!.id,
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
