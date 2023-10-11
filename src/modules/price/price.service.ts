import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { Price } from 'src/entities/price.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class PricService {
  async findAll(): Promise<response<Price[]>> {
    try {
      const price = await Price.find({});

      return {
        status: HttpStatus.OK,
        data:price,
        message:'Prices successfully fetched'
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async provicesCreate(req) {
    try {
      const { price } = req?.body;
      if (!price) {
        throw new HttpException('price is not found', HttpStatus.BAD_REQUEST);
      }

      const provices = await Price.findOne({
        where: {
          price,
        },
      });

      if (provices) {
        return {
          status: 409,
          message: 'There is such a province',
        };
      }

      const { raw } = await Price.createQueryBuilder()
        .insert()
        .into(Price)
        .values({
          price,
        })
        .returning(['price'])
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
      const { price } = req?.body;
      if (!price) {
        throw new HttpException('price is not found', HttpStatus.BAD_REQUEST);
      }

      const { id } = param;

      const { raw } = await Price.createQueryBuilder()
        .update(Price)
        .set({ price })
        .where({ price_id: id })
        .returning(['price'])
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

      const { raw } = await Price.createQueryBuilder()
        .softDelete()
        .from(Price)
        .where({ price_id: id })
        .returning(['price'])
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
