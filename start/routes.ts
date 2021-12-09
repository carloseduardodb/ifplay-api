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
}).middleware('auth')
