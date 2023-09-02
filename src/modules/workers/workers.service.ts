import { SuperAdmin } from 'src/entities/superAdmin.entities';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Workers } from 'src/entities/workers.entities';

@Injectable()
export class WorkersService {
  async findAll() {
    try {
      const user = await Workers.find();
      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workersCreate(file, req) {
    try {
      console.log(file);

      console.log(req.body);

      const {
        first_name,
        last_name,
        categories_id,
        date_of_birth,
        gender,
        phone_number,
        provinces_id,
        personal_information,
        personal_data,
      } = req.body;
      console.log(personal_data);

      const { raw } = await Workers.createQueryBuilder()
        .insert()
        .into(Workers)
        .values({
          first_name,
          last_name,
          categories: categories_id,
          date_of_birth,
          gender,
          phone_number,
          provinces: provinces_id,
          personal_information,
          personal_data,
          images: `/img/${file.filename}`,
        })
        .returning(['*'])
        .execute();

      return {
        status: 201,
        message: 'Success',
        data: raw,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workersUpdate(req, file) {
    const { first_name, last_name, email, password } = req.body;

    const { token } = req.headers;
    if (!token) {
      return {
        status: 400,
        message: 'Token is not found',
      };
    }

    const newTokenVerify = jwt.verify(token);

    const users = await Workers.findOne({
      where: {
        // password: newTokenVerify.password,
        // email: newTokenVerify.email,
      },
    });

    if (!users) {
      return {
        status: 404,
        message: 'Users is not found',
      };
    }

    const filename = file?.filename || users.images.split('/')[2];

    const data = await Workers.createQueryBuilder()
      .update(Workers)
      .set({
        first_name,
        // email,
        last_name,
        // password,
        images: `/img/${filename}`,
      })
      .where({})
      .execute();

    return {
      status: 200,
      message: 'Success',
    };
  }
}
