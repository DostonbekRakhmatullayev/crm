import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Categories } from 'src/entities/categories.entities';
import { SuperAdmin } from 'src/entities/superAdmin.entities';
import jwt from 'src/utils/jwt';
// import { SuperAdmin } from '../../entities/superAdmin.entities';

@Injectable()
export class CategoriesServic {
  async findAll() {
    try {
      const categories = await Categories.find({
        select: { id: true, categories_name: true },
      });

      return categories;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async categoriesCreate(req) {
    try {
      const { categories_name } = req?.body;
      if (!categories_name) {
        throw new HttpException(
          'categories_name is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { raw } = await Categories.createQueryBuilder()
        .insert()
        .into(Categories)
        .values({
          categories_name,
        })
        .returning(['categories_name'])
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

  async categoriesUpdate(param, req) {
    try {
      const { categories_name } = req?.body;
      if (!categories_name) {
        throw new HttpException(
          'categories_name is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { id } = param;

      const { raw } = await Categories.createQueryBuilder()
        .update(Categories)
        .set({ categories_name })
        .where({ id })
        .returning(['categories_name'])
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

  async categoriesDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Categories.createQueryBuilder()
        .softDelete()
        .from(Categories)
        .where({ id })
        .returning(['categories_name'])
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
