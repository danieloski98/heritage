import Logger from '@ioc:Adonis/Core/Logger'
import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersignupdatumValidator from 'App/Validators/UsersignupdatumValidator'
import User from 'App/Models/User'
import { UserInterface } from 'App/utils/types/user-type'
import { Return } from 'App/utils/types/returnType'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserauthsController {
  public async signup(ctx: HttpContextContract) {
    try {
      const payload = await ctx.request.validate(UsersignupdatumValidator)

      // check if the email exists in the database
      const body = ctx.request.body() as Partial<UserInterface>
      const newuser = await User.findBy('email', body.email)
      console.log(ctx.request.body())
      if (newuser === null) {
        const user = new User()
        user.fill(payload)
        await user.save()

        // send confirmation email
        await Mail.send((Message) => {
          Message.from('noreply@heritagexchange.com')
            .to('danielemmanuel257@gmail.com')
            .subject('Account Creation')
            .htmlView('emails/welcome', { email: user.email, first_name: user.first_name })
        })

        ctx.response.ok(
          Return({
            error: false,
            statusCode: 200,
            successMessage: 'User account created successfully',
          })
        )
      } else {
        ctx.response.badRequest(
          Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Email Already in use by another user!',
          })
        )
      }
    } catch (error) {
      Logger.error('An error occured', error)
      ctx.response.internalServerError(
        Return({
          error: true,
          errorMessage: 'An error occured',
          trace: error,
        })
      )
    }
  }

  public async login(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body() as Partial<UserInterface>
      const user = (await User.findBy('email', body.email)) as User

      // validate password
      const passwordValid = await Hash.verify(user.password, body.password as string)
      if (passwordValid) {
        // generate token
        const token = await ctx.auth.use('api').generate(user as any, { expiresIn: '120mins' })

        // change the login state
        user.isLoggedIn = true
        user.save()

        const updatedUser = await User.find(user.id)

        ctx.response.ok(
          Return({
            error: false,
            successMessage: 'Login Successful',
            data: {
              token,
              user: updatedUser,
            },
          })
        )
      } else {
        ctx.response.badRequest(
          Return({
            error: true,
            errorMessage: 'Passwords do not match',
          })
        )
      }
    } catch (error) {
      console.log(error)
      Logger.error(error, 'An error occured')
      ctx.response.internalServerError(
        Return({
          error: true,
          errorMessage: 'An error occured',
          trace: error,
        })
      )
    }
  }
}
