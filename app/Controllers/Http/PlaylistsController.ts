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

  public async indexQuestions({ auth, params }: HttpContextContract) {
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

  public async indexResponses({ auth, params }: HttpContextContract) {
    // pegar todas as respostas do usuário a uma playlist
    const responses = await Database.rawQuery(
      'select rp.student, rp.email, ( select count(*) as acertos ' +
        'from questions inner join quizzes on questions.quiz_id = quizzes.id ' +
        'inner join playlists on quizzes.id = playlists.quiz_id ' +
        'inner join responses on questions.id = responses.question_id ' +
        'where responses.status = true ' +
        'and rp.email = responses.email ' +
        'and playlists.id = ' +
        params.idPlaylist +
        'and questions.teacher_id = ' +
        auth.user!.id +
        ') ' +
        'as acertos, ( select count(*) as erros from questions inner join ' +
        'quizzes on questions.quiz_id = quizzes.id inner join playlists ' +
        'on quizzes.id = playlists.quiz_id inner join responses ' +
        'on questions.id = responses.question_id where responses.status = false ' +
        ' and playlists.id = ' +
        params.idPlaylist +
        ' and rp.email = responses.email ' +
        ' and questions.teacher_id = ' +
        auth.user!.id +
        ') as erros from responses as rp ' +
        'inner join teams on teams.code = rp.code ' +
        'where teams.id = ' +
        params.idTeams +
        ' ' +
        'group by student, email'
    )
    return responses
  }

  public async indexLastResponses({ auth }: HttpContextContract) {
    // pegar todas as respostas do usuário a uma playlist
    const responses = await Database.rawQuery(
      'select rp.student, rp.email, ( select count(*) as acertos ' +
        'from questions inner join quizzes on "questions"."quiz_id" = "quizzes"."id" ' +
        'inner join playlists on quizzes.id = playlists.quiz_id ' +
        'inner join responses on questions.id = responses.question_id ' +
        'where responses.status = true and rp.email = responses.email and questions.teacher_id = ' +
        auth.user!.id +
        ') ' +
        'as acertos, ( select count(*) as erros from questions inner join ' +
        'quizzes on questions.quiz_id = quizzes.id inner join playlists ' +
        'on quizzes.id = playlists.quiz_id inner join responses ' +
        'on questions.id = responses.question_id where responses.status = false and rp.email = responses.email ' +
        ' and questions.teacher_id = ' +
        auth.user!.id +
        ') as erros from responses as rp ' +
        'inner join teams on teams.code = rp.code ' +
        'group by student, email'
    )

    return responses
  }

  public async last() {
    const playlist = await Playlist.query().orderBy('id', 'desc').limit(4)
    return playlist
  }

  public async all({}: HttpContextContract) {
    const playlists = await Playlist.query()
    return playlists
  }

  public async showAllRelations({ params }: HttpContextContract) {
    const playlist = await Playlist.query().andWhere('id', params.id).limit(1)
    if (playlist[0]) {
      const quiz = await playlist[0]!.getQuizNoAuth()
      const videos = await Video.query().where('playlist_id', params.id)
      const questions = await Question.query().where('quiz_id', quiz!.id).limit(200)
      let questionsList: any[] = []
      for (const question of questions) {
        const alternatives = await Alternative.query().where('question_id', question.id)
        questionsList.push({
          ...question.$attributes,
          alternatives: alternatives,
        })
      }

      return {
        playlist: playlist,
        quiz: quiz,
        videos: videos,
        questions: questionsList,
      }
    }
  }

  //playlist os videos e as questões de uma playlist
  public async indexPlaylist({ auth, params }: HttpContextContract) {
    const playlist = await Playlist.query()
      .where('teacher_id', auth.user!.id)
      .andWhere('id', params.id)
      .limit(1)
    const quiz = await playlist[0]!.getQuiz(auth.user!.id)
    const videos = await Video.query()
      .where('playlist_id', params.id)
      .andWhere('teacher_id', auth.user!.id)
    const questions = await Question.query().where('quiz_id', quiz!.id).limit(200)
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
    return {
      playlist: playlist,
      quiz: quiz,
      videos: videos,
      questions: questionsList,
    }
  }

  //

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

  public async destroy({ params }: HttpContextContract) {
    await Playlist.findBy('id', params.id)
      .then(async (playlist) => {
        const quiz = await Quiz.findBy('id', playlist?.quizId)
        const question = await Question.find({ quiz_id: quiz?.id })
        if (playlist || quiz || question) {
          question?.delete()
          quiz?.delete()
          playlist?.delete()
        }
      })
      .catch(() => {
        Error('Playlist not found')
      })
  }

  public async destroyVideo({ params }: HttpContextContract) {
    Video.findBy('id', params.idVideo)
      .then(async (video) => {
        video?.delete()
      })
      .catch(() => {
        Error('Video not found')
      })
  }

  public async destroyQuestion({ params }: HttpContextContract) {
    console.log(params.id)
    Question.findBy('id', params.idQuestion)
      .then(async (question) => {
        question?.delete()
      })
      .catch(() => {
        Error('Question not found')
      })
  }

  public async destroyTeam({ params }: HttpContextContract) {
    Team.findBy('id', params.idTeam)
      .then(async (team) => {
        team?.delete()
      })
      .catch(() => {
        Error('Team not found')
      })
  }

  public async updateVideo({ params, request }: HttpContextContract) {
    const video = await Video.findBy('id', params.idVideo)
    if (video) {
      video.url = request.all().url
      await video.save()
    }
  }

  public async updateQuestion({ params }: HttpContextContract) {
    /**  preciso percorrer todas as respostas de uma questão e
     * verificar se a resposta é igual ao que está sendo atualizado
     * se for atualizo a resposta, além disso preciso pegar o titulo da
     * pergunta e atualizar também*/
    const question = await Question.findBy('id', params.idQuestion)
    if (question) {
      question.title = params.title
      await question.save()
    }
  }

  public async updateTeam({ params, request }: HttpContextContract) {
    const team = await Team.findBy('id', params.idTeam)
    if (team) {
      team.name = request.all().name
      await team.save()
    }
  }
}
