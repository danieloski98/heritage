import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Return } from 'src/utils/types/returnType';
import { verify } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class UserexistMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
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
    const verifiedData = verify(token, process.env.JWTSECRET);

    if (typeof verifiedData !== 'string') {
      res.status(403).send(
        Return({
          error: true,
          errorMessage: 'An error occured',
          trace: verifiedData,
        }),
      );
    } else {
      req['user'] = verifiedData;
      next();
    }
  }
}
