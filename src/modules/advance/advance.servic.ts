import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { Penalty } from 'src/entities/penalty.entites';

import { Price } from 'src/entities/price.entities';

@Injectable()
export class AdvanceServic {
  async findAll() {
    try {
      const advance = await Advance.find();

      return advance;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async advanceCreate(body) {
    try {
      const { advance, advance_name, workers } = body;

      const { raw } = await Advance.createQueryBuilder()
        .insert()
        .into(Advance)
        .values({ advance_name, workers, advance: advance })
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

  async advanceUpdate(param, body) {
    try {
      const { advance, advance_name } = body;

      const { id } = param;

      const { raw } = await Advance.createQueryBuilder()
        .update(Advance)
        .set({ advance, advance_name })
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

  async advanceDelete(param) {
    try {
      const { id } = param;

      const { raw } = await Advance.createQueryBuilder()
        .softDelete()
        .from(Advance)
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
