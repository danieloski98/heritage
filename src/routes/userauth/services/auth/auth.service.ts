import { Injectable, Logger } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { MailerService } from '@nestjs-modules/mailer';
import { sign } from 'jsonwebtoken';
import { User as MongoUser, UserDocument } from 'src/Schemas/User';
import { Referral as Ref, ReferralDocument } from 'src/Schemas/Referral';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectModel(MongoUser.name) private userModel: Model<UserDocument>,
    @InjectModel(Ref.name) private referralModel: Model<ReferralDocument>,
    private readonly mailerService: MailerService,
  ) {}

  public async signup(
    user: Partial<UserDocument>,
  ): Promise<ReturnTypeInterfcae> {
    try {
      this.logger.debug(user);
      // check for exisiting account with email
      const exisiting = await this.userModel.find({ email: user.email });
      if (exisiting.length < 1) {
        // hash password
        const pass = await this.hashPassword(user.password);
        user.password = pass;
        // create the account
        const newuser = await this.userModel.create({
          ...user,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        // send email
        const emailRes = await this.mailerService.sendMail({
          to: user.email, // list of receivers
          from: 'noreply@heritagexchange.com', // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'welcome', // plaintext body
          html: '<b>welcome to heritage exchange we are glad to have you on board</b>',
        });
        this.logger.debug(emailRes);
        // referral

        if (user.referral_code !== null || user.referral_code !== undefined) {
          const ruser = await this.referralModel.create({
            referral_id: user.referral_code,
            user_id: newuser._id,
          });
        }

        if (user.referral_code === null || user.referral_code === undefined) {
          const ref = await this.referralModel.create({
            referral_id: newuser._id,
            user_id: newuser._id,
          });

          console.log(ref);
        }

        // generate token
        // generate token
        const token = sign(
          { email: newuser.email, password: newuser.password },
          process.env.JWTSECRET,
          {
            expiresIn: '3h',
          },
        );

        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Account created successfully',
          data: {
            user: newuser,
            token,
          },
        });
      } else {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email already in use',
        });
      }
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async login(user: Partial<MongoUser>): Promise<ReturnTypeInterfcae> {
    try {
      // check account
      const account = await this.userModel.findOne({ email: user.email });
      this.logger.debug(account);

      if (account === undefined || account === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email or Password invalid!',
        });
      }

      // compare password
      const match = await compare(user.password, account.password);

      if (!match) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email or Password invalid!',
        });
      }

      // generate token
      const token = sign(
        { email: account.email, password: account.password },
        process.env.JWTSECRET,
        {
          expiresIn: '3h',
        },
      );

      return Return({
        error: false,
        successMessage: 'Login Successful',
        statusCode: 200,
        data: {
          token,
          user: account,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async updatePassword(
    id: string,
    passwords: { oldpassword: string; newpassword: string },
  ): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      console.log(user);
      if (user === null) {
        return Return({
          error: true,
          errorMessage: 'User not found',
          statusCode: 400,
        });
      }
      const match = await compare(user.password, passwords.oldpassword);

      if (passwords.oldpassword === passwords.newpassword) {
        return Return({
          error: true,
          errorMessage: 'Cannot use an old password',
          statusCode: 400,
        });
      }
      console.log(passwords);
      if (!match) {
        return Return({
          error: true,
          errorMessage: 'Incorrect password',
          statusCode: 400,
        });
      }

      if (passwords.newpassword.length < 8) {
        return Return({
          error: true,
          errorMessage: 'Password too weak!',
          statusCode: 400,
        });
      }

      const newpass = await this.hashPassword(passwords.newpassword);
      const updated = await this.userModel.updateOne(
        { _id: id },
        { password: newpass },
      );
      this.logger.log(updated);

      return Return({
        error: false,
        successMessage: 'Password changed!',
        statusCode: 200,
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async verifyAccount(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found!',
        });
      } else {
        if (user.verified) {
          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Account already activated',
          });
        }
        const updated = await this.userModel.updateOne(
          { _id: id },
          { verified: true },
        );
        this.logger.debug(updated);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Email verified',
        });
      }
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const newpassword = await hash(password, salt);
    return newpassword;
  }
}
