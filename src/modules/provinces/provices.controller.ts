import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';
import { ProvicesCreateDto } from './dto/provices.create.dto';
import { ProvicesUpdateDto } from './dto/provices.update.dto';

import { ProvicesServic } from './provices.servic';
@Controller()
export class ProvicesController {
  constructor(private readonly provicesServic: ProvicesServic) {}

  @Get('/provices')
  async findAll(@Req() req: Request) {
    return await this.provicesServic.findAll();
  }

  @Post('/provices')
  async provicesCreate(@Req() req: ProvicesCreateDto) {
    return await this.provicesServic.provicesCreate(req);
  }

  @Put('/provices/:id')
  async provicesUpdate(@Param() param: string, @Req() req?: ProvicesUpdateDto) {
    return await this.provicesServic.provicesUpdate(param, req);
  }

  @Delete('/provices/:id')
  async provicesDelete(@Param() param: string) {
    return await this.provicesServic.provicesDelete(param);
  }
}
