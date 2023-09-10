import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Monthly } from 'src/entities/monthly.entities';
import { Price } from 'src/entities/price.entities';

@Injectable()
export class MonthlyServic {
  async findAll() {
    try {
      const monthly = await Monthly.find();

      return monthly;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async monthlyCreate(req) {
    try {
      const { price_id } = req?.body;

      if (!price_id) {
        throw new HttpException(
          'price_id is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const monthly = await Monthly.find();

      const provices = await Price.findOne({
        where: {
          price_id,
        },
      });

      if (!provices) {
        return {
          status: 409,
          message: 'There is no such price',
        };
      }

      monthly.filter((e) => {
        if (e.monthly_name == provices.price) {
          return {
            status: 409,
            message: 'Such a price is available',
          };
        }
      });
      const { raw } = await Monthly.createQueryBuilder()
        .insert()
        .into(Monthly)
        .values({
          monthly_name: provices.price,
        })
        .returning(['monthly_name'])
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

  async monthlyUpdate(param, req) {
    try {
      const { monthly_name } = req?.body;
      if (!monthly_name) {
        throw new HttpException(
          'monthly_name is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { id } = param;

      const { raw } = await Monthly.createQueryBuilder()
        .update(Monthly)
        .set({ monthly_name })
        .where({ monthly_id: id })
        .returning(['monthly_name'])
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

  async monthlyDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Monthly.createQueryBuilder()
        .softDelete()
        .from(Monthly)
        .where({ monthly_id: id })
        .returning(['monthly_name'])
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
