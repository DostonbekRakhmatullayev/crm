import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  Body,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { MonthlyMonthService } from './monthly.month.service';

@Controller('/full/monthl')
export class MonthlyMonthController {
  constructor(private readonly fullMonthService: MonthlyMonthService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.fullMonthService.findAll();
  }

  @Post('/create')
  async penaltyCreate(@Body() body: CreateDto) {
    return await this.fullMonthService.Create(body);
  }

  @Put('/update/:id')
  async penaltyUpdate(@Param() param: string, @Body() Body: UpdateDto) {
    return await this.fullMonthService.Update(param, Body);
  }

  @Delete('/delete/:id')
  async penaltyDelete(@Param() param: string) {
    return await this.fullMonthService.Delete(param);
  }
}
