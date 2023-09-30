import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Categories } from 'src/entities/categories.entities';
import * as path from 'path';
@Injectable()
export class ImagesServic {
  async findAll(res, param) {
    try {
      const file = param?.filename;
      //   return categories;
      return res.sendFile(path.join(process.cwd(), 'uploads', file));
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
