import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTeacherService from 'App/Services/CreateTeacherService'
import CreateTeacher from 'App/Validators/CreateTeacherValidator'

export default class TeachersController {
  public async create({ request, response }: HttpContextContract) {
    await request.validate(CreateTeacher)
    const createTeacherService = new CreateTeacherService();
    const status = await createTeacherService.execute(request);
    if(status === true){
      return response.status(201).send({
        message: 'Sucesso ao criar nova conta!',
      });
    }else{
      return response.status(409)
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
