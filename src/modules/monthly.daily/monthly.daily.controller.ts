import {
  Controller,
  Get,
  Req,
  Body,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AdvanceCreateDto } from '../advance/dto/advance.create.dto';
import { AdvanceUpdateDto } from '../advance/dto/advance.update.dto';
import { MonthlyDailyServic } from './monthly.daily.servic';

@Controller('/advance')
export class MonthlyDailyController {
  constructor(private readonly monthlyDailyServic: MonthlyDailyServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.monthlyDailyServic.findAll();
  }

  @Post('/create')
  async monthlyDailyCreate(@Body() body: AdvanceCreateDto) {
    return await this.monthlyDailyServic.monthlyDailyCreate(body);
  }

  @Put('/update/:id')
  async advanceUpdate(@Param() param: string, @Body() body?: AdvanceUpdateDto) {
    return await this.monthlyDailyServic.monthlyDailyUpdate(param, body);
  }

  @Delete('/delete/:id')
  async advanceDelete(@Param() param: string) {
    return await this.monthlyDailyServic.monthlyDailyDelete(param);
  }
}
