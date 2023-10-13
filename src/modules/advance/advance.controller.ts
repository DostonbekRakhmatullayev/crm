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

import { AdvanceService } from './advance.service';
import { AdvanceCreateDto } from './dto/advance.create.dto';
import { AdvanceUpdateDto } from './dto/advance.update.dto';

@Controller('/advance')
export class AdvanceController {
  constructor(private readonly advanceService: AdvanceService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.advanceService.findAll();
  }

  @Post('/create')
  async advanceCreate(@Body() body: AdvanceCreateDto) {
    return await this.advanceService.advanceCreate(body);
  }

  @Put('/update/:id')
  async advanceUpdate(@Param() param: string, @Body() body?: AdvanceUpdateDto) {
    return await this.advanceService.advanceUpdate(param, body);
  }

  @Delete('/delete/:id')
  async advanceDelete(@Param() param: string) {
    return await this.advanceService.advanceDelete(param);
  }
}
