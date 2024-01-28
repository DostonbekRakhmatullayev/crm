import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Salary } from 'src/entities/salary.entities';
import { Price } from 'src/entities/price.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class SalaryService {
  async findAll(): Promise<response<Salary[]>> {
    try {
      const salaries = await Salary.find();

      return {
        status: HttpStatus.OK,
        data: salaries,
        message: 'Data successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async salaryCreate(body: any): Promise<response<Salary>> {
    try {
      const { price_id, workers_id } = body;
      if (!price_id) {
        throw new HttpException(
          'price_id is not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!workers_id) {
        throw new HttpException(
          'workers_id is not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const provinces = await Price.findOne({
        where: {
          price_id,
        },
      });

      if (!provinces) {
        return {
          status: 409,
          message: 'There is no such price',
        } as any;
      }

      const salaries = await Salary.find({
        relations: { workers: true },
      });

      // console.log(salaries);

      if (salaries.length > 0) {
        for (const e of salaries) {
          if (e?.workers?.workers_id == workers_id) {
            const { raw } = await Salary.createQueryBuilder()
              .update(Salary)
              .set({ salary_monthy: provinces.price })
              .where({ salary_id: e?.salary_id })
              .returning('*')
              .execute();

            return {
              status: 201,
              data: raw,
              message: 'Salary successfully update',
            };
          }
        }
      }

      const { raw } = await Salary.createQueryBuilder()
        .insert()
        .into(Salary)
        .values({
          salary_monthy: provinces.price,
          workers: workers_id,
        })
        .returning('*')
        .execute();

      return {
        status: 201,
        data: raw,
        message: 'Salary successfully created',
      } as any;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // async salaryUpdate(param: any, req: any): Promise<response<Salary>> {
  //   try {
  //     const { salary_monthy } = req?.body;
  //     if (!salary_monthy) {
  //       throw new HttpException(
  //         'salary_name is not found',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     const { id } = param;

  //     const { raw } = await Salary.createQueryBuilder()
  //       .update(Salary)
  //       .set({ salary_monthy })
  //       .where({ salary_id: id })
  //       .returning(['salary_name'])
  //       .execute();

  //     return {
  //       status: HttpStatus.OK,
  //       data: raw,
  //       message: 'Salary successfully updated',
  //     };
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  async salaryDelete(param: any): Promise<response<Salary>> {
    try {
      const { id } = param;

      const { raw } = await Salary.createQueryBuilder()
        .softDelete()
        .from(Salary)
        .where({ salary_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Salary successfully deleted',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
