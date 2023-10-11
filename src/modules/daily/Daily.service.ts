import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { Daily } from 'src/entities/daily.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class DailyService {
  async findAll():Promise<response<Daily[]>> {
    try {
      const advance = await Daily.find();

      return {
        status:HttpStatus.OK,
        data:advance,
        message:'Data successfully fetched'
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyCreate(body:any):Promise<response<Daily>> {
    try {
      const { advance, advance_name, workers } = body;

      const { raw } = await Daily.createQueryBuilder()
        .insert()
        .into(Daily)
        .values({})
        .returning('*')
        .execute();

      return {
        status: HttpStatus.CREATED,
        data: raw,
        message: 'Daily wages successfully created',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyUpdate(param:any, body:any):Promise<response<Daily>> {
    try {
      const { advance, advance_name } = body;

      const { id } = param;

      const { raw } = await Daily.createQueryBuilder()
        .update(Daily)
        .set({})
        .where({ advance_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Daily wage successfully updated',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyDelete(param:any):Promise<response<Daily>>  {
    try {
      const { id } = param;

      const { raw } = await Daily.createQueryBuilder()
        .softDelete()
        .from(Daily)
        .where({ advance_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Daily wage successfully deleted',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
