import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { PricCreateDto } from './dto/pric.create.dto';
import { PricUpdateDto } from './dto/pric.update.dto';
import { PricServic } from './price.servic';

@Controller('/price')
export class PricController {
  constructor(private readonly pricServic: PricServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.pricServic.findAll();
  }

  @Post('/create')
  async provicesCreate(@Req() req: PricCreateDto) {
    return await this.pricServic.provicesCreate(req);
  }

  @Put('/update')
  async provicesUpdate(@Param() param: string, @Req() req?: PricUpdateDto) {
    return await this.pricServic.provicesUpdate(param, req);
  }

  @Delete('/delete/:id')
  async provicesDelete(@Param() param: string) {
    return await this.pricServic.provicesDelete(param);
  }
}
