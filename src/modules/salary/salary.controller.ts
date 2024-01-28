import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { salaryCreateDto } from './dto/salary.create.dto';

import { SalaryService } from './salary.service';

@Controller('/monthly')
export class MonthlyController {
  constructor(private readonly monthlyServic: SalaryService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.monthlyServic.findAll();
  }

  // Ham post ham update
  @Post('/create')
  async monthlyCreate(@Body() body: salaryCreateDto) {
    return await this.monthlyServic.salaryCreate(body);
  }

  // @Put('/update/:id')
  // async monthlyUpdate(@Param() param: string, @Req() req?: Request) {
  //   return await this.monthlyServic.salaryUpdate(param, req);
  // }

  @Delete('/delete/:id')
  async monthlyDelete(@Param() param: string) {
    return await this.monthlyServic.salaryDelete(param);
  }
}
