import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateQuizValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.minLength(3), rules.maxLength(50), rules.required()]),
    code: schema.string({}, [rules.maxLength(50), rules.required()]),
  })

  public messages = {}
}
