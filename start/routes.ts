/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('teacher/login', 'AuthController.login')

Route.post('teacher/register', 'TeachersController.create')

//rotas do aluno
// 4 ultimas playlists
Route.get('playlist/last', 'PlaylistsController.last')

// 4 últimos videos
Route.get('video/last', 'VideosController.last')

// ver todos os videos
Route.get('video/all', 'VideosController.all')

// uma rota para pegar todas as playlists
Route.get('playlist/all', 'PlaylistsController.all')

// uma rota para pegar os videos e as questões de uma playlist
Route.get('/playlist/:id', 'PlaylistsController.showAllRelations')

// uma rota para envio das perguntas respondidas de uma playlist
Route.post('video/:id/playlist/question', 'VideoController.question')

// uma rota para verificação de código de playlist para saber se o aluno é autorizado
Route.get('video/:id/playlist/check', 'VideoController.check')

// uma rota para receber as respostas do aluno
Route.post('questions/answer', 'QuestionsController.saveAnswer')

Route.group(() => {
  Route.post('teacher/logout', 'AuthController.logout')

  //rotas para controller de playlist
  Route.post('teacher/playlist', 'PlaylistsController.store')
  Route.get('teacher/playlist', 'PlaylistsController.index')
  Route.get('teacher/:id/videos', 'PlaylistsController.indexVideos')
  Route.get('teacher/:id/questions', 'PlaylistsController.indexQuestions')
  Route.get('teacher/:id/teams', 'PlaylistsController.indexTeams')
  Route.get('teacher/:id/count-items', 'PlaylistsController.indexCountItems')
  Route.get('teacher/count-items', 'PlaylistsController.indexCountAllItems')
  Route.delete('teacher/playlist/:id', 'PlaylistsController.destroy')
  Route.get('/playlists/:idPlaylist/teams/:idTeams/responses', 'PlaylistsController.indexResponses')
  Route.get('/playlists/teams/responses/last', 'PlaylistsController.indexLastResponses')

  Route.get('teacher/playlist/count', 'PlaylistsController.countAllPlaylists')

  //rotas para controller de perguntas
  Route.get('teacher/answers', 'AnswersController.index')
  Route.post('teacher/answers', 'AnswersController.store')
  Route.get('teacher/answers/count', 'AnswersController.countAll')

  //rotas para controller de questões (títulos)
  Route.get('teacher/questions', 'QuestionsController.index')
  Route.post('teacher/questions', 'QuestionsController.store')

  //rotas para controllers de quizzes (engloba questões e perguntas)
  Route.get('teacher/quizzes', 'QuizzesController.index')
  Route.post('teacher/quizzes', 'QuizzesController.store')
  Route.post('teacher/playlist/quiz/:id', 'QuizzesController.update')
  Route.get('teacher/quizzes/:id', 'QuizzesController.index')

  //rotas para controllers de classes
  Route.get('teacher/teams', 'TeamsController.index')
  Route.post('teacher/teams', 'TeamsController.store')

  //preenche todo o campo da dashboard
  Route.get('teacher/items/count', 'TeachersController.indexDashboard')

  //rotas para controllers de videos
  Route.get('teacher/videos', 'VideosController.index')
  Route.post('teacher/videos', 'VideosController.store')

  // apagar dentro de playlist
  Route.delete('teacher/playlist/video/:idVideo', 'PlaylistsController.destroyVideo')
  Route.delete('teacher/playlist/question/:idQuestion', 'PlaylistsController.destroyQuestion')
  Route.delete('teacher/playlist/team/:idTeam', 'PlaylistsController.destroyTeam')

  // atualizar dentro de playlist
  Route.put('teacher/playlist/video/:idVideo', 'PlaylistsController.updateVideo')
  Route.put('teacher/playlist/question/:idQuestion', 'PlaylistsController.updateQuestion')
  Route.put('teacher/playlist/team/:idTeam', 'PlaylistsController.updateTeam')

  // atualizar senha do professor
  Route.put('teacher/password', 'TeachersController.updatePassword')

  // atualizar email do professor
  Route.put('teacher/email', 'TeachersController.updateEmail')

  // apagar consta do professor
  Route.delete('teacher', 'TeachersController.destroy')
}).middleware('auth')
