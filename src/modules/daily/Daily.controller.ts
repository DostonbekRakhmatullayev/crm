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

import { DailyService } from './Daily.service';
import { DailyCreateDto } from './dto/Daily.create.dto';
import { DailyUpdateDto } from './dto/Daily.update.dto';

@Controller('/daily')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.dailyService.findAll();
  }

  @Post('/create')
  async dailyCreate(@Body() body) {
    return await this.dailyService.dailyCreate(body);
  }

  @Put('/update/:id')
  async advanceUpdate(@Param() param: string, @Body() body?: DailyUpdateDto) {
    return await this.dailyService.dailyUpdate(param, body);
  }

  @Delete('/delete/:id')
  async advanceDelete(@Param() param: string) {
    return await this.dailyService.dailyDelete(param);
  }
}
