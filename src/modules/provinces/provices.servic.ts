import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Categories } from 'src/entities/categories.entities';
import { Provinces } from 'src/entities/provinces.entities';
import jwt from 'src/utils/jwt';

@Injectable()
export class ProvicesServic {
  async findAll() {
    try {
      const categories = await Provinces.find({
        select: { provinces_id: true, provinces_text: true },
      });

      return categories;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async provicesCreate(req) {
    try {
      const { provinces_text } = req?.body;

      if (!provinces_text) {
        throw new HttpException(
          'categories_name is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const provices = await Provinces.findOne({
        where: {
          provinces_text,
        },
      });

      if (provices) {
        return {
          status: 409,
          message: 'There is such a province',
        };
      }

      const { raw } = await Provinces.createQueryBuilder()
        .insert()
        .into(Provinces)
        .values({
          provinces_text,
        })
        .returning(['provinces_text'])
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

  async provicesUpdate(param, req) {
    try {
      const { provinces_text } = req?.body;
      if (!provinces_text) {
        throw new HttpException(
          'provinces_text is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { id } = param;

      const { raw } = await Provinces.createQueryBuilder()
        .update(Provinces)
        .set({ provinces_text })
        .where({ provinces_id: id })
        .returning(['provinces_text'])
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

  async provicesDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Provinces.createQueryBuilder()
        .softDelete()
        .from(Provinces)
        .where({ provinces_id: id })
        .returning(['provinces_text'])
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
