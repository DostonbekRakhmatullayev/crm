import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Penalty } from 'src/entities/penalty.entites';

import { Price } from 'src/entities/price.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class PenaltyService {
  async findAll(): Promise<response<Penalty[]>> {
    try {
      const penalty = await Penalty.find({});

      return {
        status: HttpStatus.OK,
        data: penalty,
        message:'Penalties successfully fetched'
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async penaltyCreate(req:any): Promise<response<Penalty>> {
    try {
      const { penalty_name, penalty, workers } = req?.body;
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
        data: raw,
        message: 'Penalty created successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async penaltyUpdate(param:any, req:any): Promise<response<Penalty>> {
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
        data: raw,
        message: 'Penalty updated successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async penaltyDelete(param:any): Promise<response<Penalty>> {
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
        data: raw,
        message: 'Penalty deleted successfully',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
