import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Admin } from 'src/entities/admin.entities';
import jwt from 'src/utils/jwt';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    try {
      if (!req?.headers.token) {
        throw new HttpException('Token is not found', 404);
      }

      const { token } = req?.headers as any;
      const { id } = jwt.verify(token);

      const users = await Admin.findOne({
        where: {
          id,
        },
      });

      if (!users) {
        throw new HttpException(
          'Users with this token are not loaded ',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (users) {
        next();
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
