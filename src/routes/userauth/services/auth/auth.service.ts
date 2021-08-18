import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Referral } from 'src/Entity/Referral.entity';
import { User } from 'src/Entity/User.entity';
import { Repository } from 'typeorm';
import { hash, genSalt, compare } from 'bcrypt';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { MailerService } from '@nestjs-modules/mailer';
import { sign } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Referral) private referralRepo: Repository<Referral>,
    private readonly mailerService: MailerService,
  ) {}

  public async signup(user: Partial<User>): Promise<ReturnTypeInterfcae> {
    try {
      this.logger.debug(user);
      // check for exisiting account with email
      const exisiting = await this.userRepo.find({
        where: { email: user.email },
      });
      if (exisiting.length < 1) {
        // hash password
        const pass = await this.hashPassword(user.password);
        user.password = pass;
        // create the account
        const newuser = await this.userRepo.save({
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
          html: '<b>welcome</b>',
        });
        this.logger.debug(emailRes);
        // referral
        this.logger.error(user.referral_code);

        if (user.referral_code !== null || user.referral_code !== undefined) {
          const ruser = await this.userRepo.findOne({
            where: { id: user.referral_code },
          });

          if (ruser === null) {
            // set the user as his own referral
            const updatedUser = await this.userRepo.findOne({
              where: { email: user.email },
            });
            // set the user as his own referral
            const update = await this.userRepo
              .createQueryBuilder()
              .update()
              .set({ referral_code: updatedUser.id })
              .where({ email: updatedUser.email })
              .execute();

            const account = await this.userRepo.findOne({
              where: { id: newuser.id },
            });
            delete account.password;

            return Return({
              error: false,
              statusCode: 200,
              successMessage: 'Account created successfully',
              data: account,
            });
          } else {
            const updatedUser = await this.userRepo.findOne({
              where: { email: user.email },
            });
            // set the user as his own referral
            const update = await this.userRepo
              .createQueryBuilder()
              .update()
              .set({ referral_code: updatedUser.id })
              .where({ email: newuser.email })
              .execute();

            const account = await this.userRepo.findOne({
              where: { id: newuser.id },
            });
            delete account.password;

            return Return({
              error: false,
              statusCode: 200,
              successMessage: 'Account created successfully',
              data: account,
            });
          }
        }
        if (user.referral_code === null || user.referral_code === undefined) {
          const updatedUser = await this.userRepo.findOne({
            where: { email: user.email },
          });
          // set the user as his own referral
          const update = await this.userRepo
            .createQueryBuilder()
            .update()
            .set({ referral_code: newuser.id })
            .where({ email: newuser.email })
            .execute();
          this.logger.error(update);
          const newref = await this.referralRepo.insert({
            referral_id: updatedUser.id,
            user_id: updatedUser.id,
          });
          this.logger.debug(newref);

          const account = await this.userRepo.findOne({
            where: { id: newuser.id },
          });
          delete account.password;

          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Account created successfully',
            data: account,
          });
        }
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

  public async login(user: Partial<User>): Promise<ReturnTypeInterfcae> {
    try {
      // check account
      const account = await this.userRepo.findOne({
        where: { email: user.email },
        relations: ['banks', 'wallets', 'transactions', 'referrals'],
      });
      this.logger.debug(account);

      if (account === undefined) {
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
          expiresIn: '2h',
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
      const user = await this.userRepo.findOne({ where: { id } });
      console.log(user);
      if (user === undefined) {
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
      const updated = await this.userRepo.update({ id }, { password: newpass });
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
      const user = await this.userRepo.findOne({ where: { id } });
      if (user === undefined) {
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
        const updated = await this.userRepo.update({ id }, { verified: true });
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
