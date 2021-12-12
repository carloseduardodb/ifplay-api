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
    return video
  }

  // 4 últimos videos
  public async last({}: HttpContextContract) {
    const videos = await Video.query().orderBy('id', 'desc').limit(4)
    return videos
  }

  // pegar todos os videos
  public async all({}: HttpContextContract) {
    const videos = await Video.all()
    return videos
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
