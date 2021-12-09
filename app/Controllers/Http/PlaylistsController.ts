import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlaylistValidator from '../../Validators/CreatePlaylistValidator'
import Playlist from '../../Models/Playlist'
import Quiz from '../../Models/Quiz'
import { v4 as uuidv4 } from 'uuid'
import Video from '../../Models/Video'
import Question from '../../Models/Question'
import Alternative from 'App/Models/Alternative'
import Team from 'App/Models/Team'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PlaylistsController {
  public async index({ auth }: HttpContextContract) {
    const playlists = await Playlist.query().where('teacher_id', auth.user!.id)
    let quizzes: Quiz[] = []
    playlists.map(async (playlist) => {
      const quiz = await playlist.getQuiz(auth.user!.id)
      if (quiz) quizzes.push(quiz)
    })
    return {
      playlists: playlists,
      quizzes: quizzes,
    }
  }

  public async indexVideos({ auth, params }: HttpContextContract) {
    const videos = await Video.query()
      .where('playlist_id', params.id)
      .andWhere('teacher_id', auth.user!.id)
    return videos
  }

  public async indexTeams({ auth, params }: HttpContextContract) {
    const playlist = await Playlist.query()
      .where('id', params.id)
      .andWhere('teacher_id', auth.user!.id)
      .limit(1)
    const teams = await Team.query().where('quiz_id', playlist[0]!.quizId)
    return teams
  }

  public async indexQuestions({ auth, params, response }: HttpContextContract) {
    const playlist = await Playlist.query()
      .where('teacher_id', auth.user!.id)
      .andWhere('id', params.id)
      .limit(1)
    const questions = await Question.query().where('quiz_id', playlist[0]!.quizId).limit(200)
    let questionsList: any[] = []
    for (const question of questions) {
      const alternatives = await Alternative.query()
        .where('question_id', question.id)
        .andWhere('teacher_id', auth.user!.id)
      questionsList.push({
        ...question.$attributes,
        alternatives: alternatives,
      })
    }
    return questionsList
  }

  public async indexCountItems({ auth, params }: HttpContextContract) {
    const playlist = await Playlist.query()
      .where('id', params.id)
      .andWhere('teacher_id', auth.user!.id)

    const videos = await Database.from('videos').where('playlist_id', playlist[0]!.id).count({
      count: '*',
    })

    const questions = await Database.from('questions').where('quiz_id', playlist[0]!.quizId).count({
      count: '*',
    })

    return {
      videos: videos[0].count,
      questions: questions[0].count,
    }
  }

  public async indexCountAllItems({ auth }: HttpContextContract) {
    const playlists = await Playlist.query().where('teacher_id', auth.user!.id)
    let playlistList: any[] = []
    for (const playlist of playlists) {
      const getCount = await playlist.getCountAll(auth.user!.id)
      playlistList.push({
        ...playlist.$attributes,
        quantity: getCount,
      })
    }
    return playlistList
  }

  public async countAllPlaylists({ auth }: HttpContextContract) {
    const playlists = await Database.from('playlists').where('teacher_id', auth.user!.id).count({
      count: '*',
    })
    return playlists
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(CreatePlaylistValidator)
    const { id } = await Quiz.create({
      title: 'Sem titulo',
      code: uuidv4(),
      teacherId: auth.user!.id,
    })
    const status = await Playlist.create({
      ...data,
      teacherId: auth.user?.id,
      quizId: id,
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

  public async destroy({ params }: HttpContextContract) {
    console.log(params.id)
    Playlist.findBy('id', params.id)
      .then(async (playlist) => {
        if (playlist) await playlist.delete()
      })
      .catch(() => {
        Error('Playlist not found')
      })
  }
}
