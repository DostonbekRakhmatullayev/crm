import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { Penalty } from 'src/entities/penalty.entites';

import { Price } from 'src/entities/price.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class AdvanceService {
  async findAll(): Promise<response<Advance[]>> {
    try {
      const advance = await Advance.find();

      return {
        status: HttpStatus.OK,
        data: advance,
        message: 'Advances successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async advanceCreate(body:any): Promise<response<Advance>> {
    try {
      const { advance, advance_name, workers } = body;

      const { raw } = await Advance.createQueryBuilder()
        .insert()
        .into(Advance)
        .values({ advance_name, workers, advance: advance })
        .returning('*')
        .execute();

      return {
        status: HttpStatus.CREATED,
        data: raw,
        message: 'Avance successfully created',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async advanceUpdate(param:any, body:any): Promise<response<Advance>> {
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
        status: HttpStatus.OK,
        data: raw,
        message: 'Advance successfully updated',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async advanceDelete(param:any): Promise<response<Advance>> {
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
        message: 'Advance successfully deleted',
        data: raw,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
