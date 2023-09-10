import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { PricCreateDto } from '../price/dto/pric.create.dto';
import { PricUpdateDto } from '../price/dto/pric.update.dto';
import { PenaltyServic } from './penalty.servic';

@Controller('/penalty')
export class PenaltyController {
  constructor(private readonly penaltyServic: PenaltyServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.penaltyServic.findAll();
  }

  @Post('/create')
  async penaltyCreate(@Req() req: PricCreateDto) {
    return await this.penaltyServic.penaltyCreate(req);
  }

  @Put('/update/:id')
  async penaltyUpdate(@Param() param: string, @Req() req?: PricUpdateDto) {
    return await this.penaltyServic.penaltyUpdate(param, req);
  }

  @Delete('/delete/:id')
  async penaltyDelete(@Param() param: string) {
    return await this.penaltyServic.penaltyDelete(param);
  }
}
