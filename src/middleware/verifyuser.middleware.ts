import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Return } from 'src/utils/types/returnType';
import { verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/Schemas/User';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class VerifyuserMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      // get the user details from the token
      const auth = req.headers['authorization'];

      if (auth === null || auth === undefined) {
        res.status(403).send(
          Return({
            error: true,
            errorMessage: 'User not found',
          }),
        );
      }

      const token = auth.split(' ')[1];
      const verifiedData = verify(
        token,
        process.env.JWTSECRET,
      ) as Partial<UserDocument>;
      // search for user
      const user = await this.userModel.findById(verifiedData._id);
      if (user === null || user === undefined) {
        const msg = Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
        res.status(msg.statusCode).send(msg);
      }
      req['user'] = verifiedData._id;
      next();
    } catch (error) {
      res.status(400).send({
        error: true,
        statusCode: 400,
        errorMessage: 'token expired or malformed',
        trace: error,
      });
    }
  }
}
