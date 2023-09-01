import { Controller, Get, Req, Post, Put, Param, Delete } from '@nestjs/common';

import { ProvicesServic } from './provices.servic';
@Controller()
export class ProvicesController {
  constructor(private readonly provicesServic: ProvicesServic) {}

  @Get('/provices')
  async findAll(@Req() req: Request) {
    return await this.provicesServic.findAll();
  }

  @Post('/provices')
  async categoriesCreate(@Req() req: CategoriesCreateDto) {
    return await this.provicesServic.categoriesCreate(req);
  }

  @Put('/provices/:id')
  async categoriesUpdate(
    @Param() param: string,
    @Req() req?: categoriesUpdateDto,
  ) {
    return await this.provicesServic.categoriesUpdate(param, req);
  }

  @Delete('/provices/:id')
  async categoriesDelete(@Param() param: string) {
    return await this.provicesServic.categoriesDelete(param);
  }
}
