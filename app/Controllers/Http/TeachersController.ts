import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async index({}: HttpContextContract) {}

  public async create({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const teacher = await Teacher.create(data)
    return teacher
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
