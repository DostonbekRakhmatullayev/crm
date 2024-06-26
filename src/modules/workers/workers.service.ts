import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Workers } from 'src/entities/workers.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class WorkersService {
  async findAll(): Promise<response<Workers[]>> {
    try {
      const user = await Workers.find({
        relations: {
          penalty: true,
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
          penalty: {
            penalty_name: true,
            penalty: true,
            penalty_id: true,
          },
        },
      });
      return {
        status: HttpStatus.OK,
        data: user,
        message: 'Workers successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(param: any): Promise<response<Workers>> {
    try {
      const id = param?.id;
      const user = await Workers.findOne({
        where: {
          workers_id: id,
        },
        relations: {
          penalty: true,
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
          penalty: {
            penalty_name: true,
            penalty: true,
            penalty_id: true,
          },
        },
      });

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Worker is not found',
        };
      }

      return {
        status: HttpStatus.OK,
        data: user,
        message: 'User fetched successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workersCreate(file: any, req: any): Promise<response<Workers>> {
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
        .returning('*')
        .execute();

      return {
        status: 201,
        data: raw,
        message: 'Worker created successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workersUpdate(
    req: any,
    file: any,
    param: any,
  ): Promise<response<Workers>> {
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
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Worker updated successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async workerDelete(param: any): Promise<response<Workers>> {
    try {
      const { id } = param;

      const { raw } = await Workers.createQueryBuilder()
        .softDelete()
        .from(Workers)
        .where({ workers_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Worker deleted successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
