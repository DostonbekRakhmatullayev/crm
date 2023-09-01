import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SuperAdmin } from 'src/entities/superAdmin.entities';
import jwt from 'src/utils/jwt';

@Injectable()
export class ChikTokenMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    try {
      console.log(req?.headers.token);

      if (!req?.headers.token) {
        throw new HttpException('Token is not found', 404);
      }

      const { token } = req?.headers as any;
      console.log(token);

      const { password, email } = jwt.verify(token);

      //   const users = await SuperAdmin.findOne({
      //     where: { password, email },
      //   });

      //   if (!users) {
      //     return {
      //       status: 404,
      //       message: 'Users is not found',
      //     };
      //   }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
