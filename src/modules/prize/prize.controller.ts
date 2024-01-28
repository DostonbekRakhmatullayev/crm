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

import { PrizeService } from './prize.service';
import { PrizeCreateDto } from './dto/prize.create.dto';
import { PrizeUpdateDto } from './dto/prize.update.dto';

@Controller('/prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.prizeService.findAll();
  }

  @Post('/create')
  async prizeCreate(@Body() body: PrizeCreateDto) {
    return await this.prizeService.prizeCreate(body);
  }

  @Put('/update/:id')
  async prizeUpdate(@Param() param: string, @Body() body?: PrizeUpdateDto) {
    return await this.prizeService.prizeUpdate(param, body);
  }

  @Delete('/delete/:id')
  async prizeDelete(@Param() param: string) {
    return await this.prizeService.prizeDelete(param);
  }
}
