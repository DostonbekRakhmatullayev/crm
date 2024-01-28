import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { Penalty } from 'src/entities/penalty.entites';

import { Price } from 'src/entities/price.entities';
import { Prize } from 'src/entities/prize.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class PrizeService {
  async findAll(): Promise<response<Prize[]>> {
    try {
      const prize = await Prize.find();

      return {
        status: HttpStatus.OK,
        data: prize,
        message: 'Prize successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async prizeCreate(body: any): Promise<response<Prize>> {
    try {
      const { prize, workers_id, prize_text } = body;

      const { raw } = await Prize.createQueryBuilder()
        .insert()
        .into(Prize)
        .values({ prize, workers: workers_id, prize_text })
        .returning('*')
        .execute();

      return {
        status: HttpStatus.CREATED,
        data: raw,
        message: 'Priza successfully created',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async prizeUpdate(param: any, body: any): Promise<response<Prize>> {
    try {
      const { prize, workers_id, prize_text } = body;

      const { id } = param;

      const { raw } = await Prize.createQueryBuilder()
        .update(Prize)
        .set({ prize, prize_text, workers: workers_id })
        .where({ prize_id: id })
        .returning('*')
        .execute();

      return {
        status: HttpStatus.OK,
        data: raw,
        message: 'Prize successfully updated',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async prizeDelete(param: any): Promise<response<Prize>> {
    try {
      const { id } = param;

      const { raw } = await Prize.createQueryBuilder()
        .softDelete()
        .from(Prize)
        .where({ prize_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        message: 'Prize successfully deleted',
        data: raw,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
