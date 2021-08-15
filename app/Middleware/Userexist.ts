import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { Return } from 'App/utils/types/returnType'
import { UserInterface } from 'App/utils/types/user-type'

export default class Userexist {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const body = request.body() as UserInterface

    // check if user exists
    const user = await User.findBy('email', body.email)

    if (user !== null) {
      await next()
    } else {
      response.badRequest(
        Return({
          error: true,
          errorMessage: `Account not found`,
        })
      )
    }
  }
}
