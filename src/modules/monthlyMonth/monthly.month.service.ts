import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MonthlyMonth } from 'src/entities/monthly.month.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class MonthlyMonthService {
  async findAll(): Promise<response<MonthlyMonth[]>> {
    try {
      const data = await MonthlyMonth.find();

      return {
        status: HttpStatus.OK,
        data: data,
        message: 'Penalties successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async Create(body: any): Promise<response<MonthlyMonth>> {
    try {
      let today = new Date();
      var dd = String(new Date().getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      const data = await MonthlyMonth.find();

      const newData = data.filter((e) => {
        if (
          String(e.createdAt.getDate()).padStart(2, '0') == dd &&
          String(e.createdAt.getMonth() + 1).padStart(2, '0') == mm &&
          e.createdAt.getFullYear() == yyyy
        ) {
          return e;
        }
      });
      if (newData.length > 0) {
        return {
          status: 409,
          message: 'Birkunda birmatta oylik birik tirasiz ',
        } as any;
      }

      const { monthlydaily_money, workers } = body;
      const { raw } = await MonthlyMonth.createQueryBuilder()
        .insert()
        .into(MonthlyMonth)
        .values({ monthlydaily_money, workers })
        .returning('*')
        .execute();

      return {
        status: 201,
        data: raw,
        message: 'Monthly created successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async Update(param: any, body: any): Promise<response<MonthlyMonth>> {
    try {
      const { monthlydaily_money, workers } = body;
      const { id } = param;
      const { raw } = await MonthlyMonth.createQueryBuilder()
        .update(MonthlyMonth)
        .set({ monthlydaily_money, workers })
        .where({ monthlymonth_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Penalty updated successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async Delete(param: any): Promise<response<MonthlyMonth>> {
    try {
      const { id } = param;

      const { raw } = await MonthlyMonth.createQueryBuilder()
        .softDelete()
        .from(MonthlyMonth)
        .where({ monthlymonth_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Penalty deleted successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
