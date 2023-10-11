import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { PricCreateDto } from '../price/dto/pric.create.dto';
import { PricUpdateDto } from '../price/dto/pric.update.dto';
import { PenaltyService } from './penalty.service';

@Controller('/penalty')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Get('/get')
  async findAll(@Req() req: Request) {
    return await this.penaltyService.findAll();
  }

  @Post('/create')
  async penaltyCreate(@Req() req: PricCreateDto) {
    return await this.penaltyService.penaltyCreate(req);
  }

  @Put('/update/:id')
  async penaltyUpdate(@Param() param: string, @Req() req?: PricUpdateDto) {
    return await this.penaltyService.penaltyUpdate(param, req);
  }

  @Delete('/delete/:id')
  async penaltyDelete(@Param() param: string) {
    return await this.penaltyService.penaltyDelete(param);
  }
}
