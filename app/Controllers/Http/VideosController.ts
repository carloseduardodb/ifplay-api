import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from '../../Models/Video'
import CreateVideoValidator from '../../Validators/CreateVideoValidator'

export default class VideosController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, request }: HttpContextContract) {
    const data = await request.validate(CreateVideoValidator)
    const video = await Video.create({
      ...data,
      views: 0,
      teacherId: auth.user!.id,
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
