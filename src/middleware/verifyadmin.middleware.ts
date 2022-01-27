import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Return } from 'src/utils/types/returnType';
import { verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/Schemas/Admin.Schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class VerifyadminMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    try {
      // get the user details from the token
      const auth = req.headers['authorization'];

      if (auth === null || auth === undefined) {
        res.status(403).send(
          Return({
            error: true,
            errorMessage: 'User not found',
            statusCode: 403,
          }),
        );
      } else {
        const token = auth.split(' ')[1];
        const verifiedData = verify(
          token,
          process.env.JWTSECRET,
        ) as Partial<AdminDocument>;
        // search for user
        console.log(verifiedData);
        const user = await this.adminModel.findById(verifiedData._id);
        if (user === null || user === undefined) {
          const msg = Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Admin User not found',
          });
          res.status(msg.statusCode).send(msg);
        } else {
          req['user'] = verifiedData._id;
          next();
        }
      }
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
