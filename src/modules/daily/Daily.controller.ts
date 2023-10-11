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
import { DailyService } from './Daily.service';

@Controller('/advance')
export class DailyController {
  constructor(private readonly dailyService:DailyService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.dailyService.findAll();
  }

  @Post('/create')
  async dailyCreate(@Body() body: AdvanceCreateDto) {
    return await this.dailyService.dailyCreate(body);
  }

  @Put('/update/:id')
  async advanceUpdate(@Param() param: string, @Body() body?: AdvanceUpdateDto) {
    return await this.dailyService.dailyUpdate(param, body);
  }

  @Delete('/delete/:id')
  async advanceDelete(@Param() param: string) {
    return await this.dailyService.dailyDelete(param);
  }
}
