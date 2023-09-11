import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { MonthlyDaily } from 'src/entities/monthlyDaily.entities';

@Injectable()
export class MonthlyDailyServic {
  async findAll() {
    try {
      const advance = await MonthlyDaily.find();

      return advance;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async monthlyDailyCreate(body) {
    try {
      const { advance, advance_name, workers } = body;

      const { raw } = await MonthlyDaily.createQueryBuilder()
        .insert()
        .into(MonthlyDaily)
        .values({})
        .returning('*')
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

  async monthlyDailyUpdate(param, body) {
    try {
      const { advance, advance_name } = body;

      const { id } = param;

      const { raw } = await MonthlyDaily.createQueryBuilder()
        .update(MonthlyDaily)
        .set({})
        .where({ advance_id: id })
        .returning('*')
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

  async monthlyDailyDelete(param) {
    try {
      const { id } = param;

      const { raw } = await MonthlyDaily.createQueryBuilder()
        .softDelete()
        .from(MonthlyDaily)
        .where({ advance_id: id })
        .returning('*')
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
