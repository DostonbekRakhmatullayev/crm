import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Categories } from 'src/entities/categories.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class CategoriesService {
  async findAll(): Promise<response<Categories[]>> {
    try {
      const categories = await Categories.find({
        select: { id: true, categories_name: true },
      });

      return {
        status: HttpStatus.OK,
        data: categories,
        message:'Categories succeessfully fetched'
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async categoriesCreate(req:any) : Promise<response<Categories>> {
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
        status: HttpStatus.CREATED,
        data: raw,
        message: 'Category successfully created',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async categoriesUpdate(param:any, req:any): Promise<response<Categories>> {
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
        status: HttpStatus.OK,
        data: raw,
        message: 'Category successfully updated',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async categoriesDelete(param:any): Promise<response<Categories>> {
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
        data: raw,
        message: 'Category successfully deleted',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
