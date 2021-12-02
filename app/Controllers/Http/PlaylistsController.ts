import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlaylistValidator from '../../Validators/CreatePlaylistValidator'
import Playlist from '../../Models/Playlist'
import Quiz from '../../Models/Quiz'

export default class PlaylistsController {
  public async index({}: HttpContextContract) {
    const playlists = await Playlist.all()
    let quizzes: Quiz[] = []
    playlists.map(async (playlist) => {
      const q = await Quiz.findBy('playlist_id', playlist.id)
      q ? quizzes.push(q) : null
    })
    return {
      playlists: playlists,
      quizzes: quizzes,
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(CreatePlaylistValidator)
    const status = await Playlist.create({
      ...data,
      teacherId: auth.user?.id,
    })
    if (!!status) {
      return {
        status: 'success',
        message: 'Playlist created',
      }
    } else {
      Error('Playlist not created')
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
