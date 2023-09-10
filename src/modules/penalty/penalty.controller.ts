import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { PricCreateDto } from '../price/dto/pric.create.dto';
import { PricUpdateDto } from '../price/dto/pric.update.dto';
import { PenaltyServic } from './penalty.servic';

@Controller('/price')
export class PenaltyController {
  constructor(private readonly penaltyServic: PenaltyServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.penaltyServic.findAll();
  }

  @Post('/create')
  async provicesCreate(@Req() req: PricCreateDto) {
    return await this.penaltyServic.provicesCreate(req);
  }

  @Put('/update/:id')
  async provicesUpdate(@Param() param: string, @Req() req?: PricUpdateDto) {
    return await this.penaltyServic.provicesUpdate(param, req);
  }

  @Delete('/delete/:id')
  async provicesDelete(@Param() param: string) {
    return await this.penaltyServic.provicesDelete(param);
  }
}
