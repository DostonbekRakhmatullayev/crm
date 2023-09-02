import { SuperAdmin } from 'src/entities/superAdmin.entities';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Workers } from 'src/entities/workers.entities';

@Injectable()
export class WorkersService {
  async findAll() {
    try {
      const user = await Workers.find({
        select: {
          workers_id: true,
          first_name: true,
          last_name: true,
          date_of_birth: true,
          gender: true,
          phone_number: true,
          personal_information: true,
          personal_data: true,
          images: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(param) {
    try {
      const id = param?.id;
      const user = await Workers.findOne({
        where: {
          workers_id: id,
        },
        select: {
          workers_id: true,
          first_name: true,
          last_name: true,
          date_of_birth: true,
          gender: true,
          phone_number: true,
          personal_information: true,
          personal_data: true,
          images: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workersCreate(file, req) {
    try {
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

  async workersUpdate(req, file, param) {
    try {
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

      const { id } = param;

      const users = await Workers.findOne({
        where: {
          workers_id: id,
        },
      });

      const filename = file?.filename || users.images.split('/')[2];

      const { raw } = await Workers.createQueryBuilder()
        .update(Workers)
        .set({
          first_name,
          last_name,
          categories: categories_id,
          date_of_birth,
          gender,
          phone_number,
          provinces: provinces_id,
          personal_information,
          personal_data,
          images: `/img/${filename}`,
        })
        .where({
          workers_id: id,
        })
        .returning([
          'first_name',
          'last_name',
          'categories',
          'date_of_birth',
          'gender',
          'phone_number',
          'provinces',
          'personal_information',
          'personal_data',
          'images',
        ])
        .execute();
      console.log(raw);

      return {
        status: 200,
        message: 'Success',
        data: raw,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workerDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Workers.createQueryBuilder()
        .softDelete()
        .from(Workers)
        .where({ workers_id: id })
        .returning([
          'first_name',
          'last_name',
          'categories',
          'date_of_birth',
          'gender',
          'phone_number',
          'provinces',
          'personal_information',
          'personal_data',
          'images',
        ])
        .execute();

      return {
        status: 200,
        message: 'Success',
        data: raw,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
