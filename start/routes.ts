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

  //rotas para controller de perguntas
  Route.get('teacher/answers', 'PlaylistsController.index')
  Route.post('teacher/answers', 'PlaylistsController.store')

  //rotas para controller de questões (títulos)
  Route.get('teacher/questions', 'QuestionsController.index')
  Route.post('teacher/questions', 'QuestionsController.store')

  //rotas para controllers de quizzes (engloba questões e perguntas)
  Route.get('teacher/quizzes', 'QuizzesController.index')
  Route.post('teacher/quizzes', 'QuizzesController.store')

  //rotas para controllers de classes
  Route.get('teacher/teams', 'TeamsController.index')
  Route.post('teacher/teams', 'TeamsController.store')

  //rotas para controllers de videos
  Route.get('teacher/videos', 'VideosController.index')
  Route.post('teacher/videos', 'VideosController.store')
}).middleware('auth')
