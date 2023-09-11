import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Penalty } from 'src/entities/penalty.entites';

import { Price } from 'src/entities/price.entities';

@Injectable()
export class PenaltyServic {
  async findAll() {
    try {
      const penalty = await Penalty.find({});

      return penalty;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async penaltyCreate(req) {
    try {
      const { penalty_name, penalty, workers } = req?.body;

      // const provices = await Penalty.findOne({
      //   where: {},
      // });

      // if (provices) {
      //   return {
      //     status: 409,
      //     message: 'There is such a province',
      //   };
      // }

      const { raw } = await Penalty.createQueryBuilder()
        .insert()
        .into(Penalty)
        .values({
          penalty_name,
          penalty,
          workers,
        })
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

  async penaltyUpdate(param, req) {
    try {
      const { penalty, penalty_name } = req?.body;

      const { id } = param;

      const { raw } = await Penalty.createQueryBuilder()
        .update(Penalty)
        .set({ penalty, penalty_name })
        .where({ penalty_id: id })
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

  async penaltyDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Penalty.createQueryBuilder()
        .softDelete()
        .from(Penalty)
        .where({ penalty_id: id })
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
