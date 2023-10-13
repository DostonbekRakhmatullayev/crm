import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { Request } from 'express';

import { MonthlyServic } from './salary.service';

@Controller('/monthly')
export class MonthlyController {
  constructor(private readonly monthlyServic: MonthlyServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.monthlyServic.findAll();
  }

  @Post('/create')
  async monthlyCreate(@Req() req: Request) {
    return await this.monthlyServic.monthlyCreate(req);
  }

  @Put('/update/:id')
  async monthlyUpdate(@Param() param: string, @Req() req?: Request) {
    return await this.monthlyServic.monthlyUpdate(param, req);
  }

  @Delete('/delete/:id')
  async monthlyDelete(@Param() param: string) {
    return await this.monthlyServic.monthlyDelete(param);
  }
}
