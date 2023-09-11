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

import { AdvanceServic } from './advance.servic';
import { AdvanceCreateDto } from './dto/advance.create.dto';
import { AdvanceUpdateDto } from './dto/advance.update.dto';

@Controller('/advance')
export class AdvanceController {
  constructor(private readonly advanceServic: AdvanceServic) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.advanceServic.findAll();
  }

  @Post('/create')
  async advanceCreate(@Body() body: AdvanceCreateDto) {
    return await this.advanceServic.advanceCreate(body);
  }

  @Put('/update/:id')
  async advanceUpdate(@Param() param: string, @Body() body?: AdvanceUpdateDto) {
    return await this.advanceServic.advanceUpdate(param, body);
  }

  @Delete('/delete/:id')
  async advanceDelete(@Param() param: string) {
    return await this.advanceServic.advanceDelete(param);
  }
}
