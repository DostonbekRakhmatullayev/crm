import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';

import { CategoriesServic } from './categories.servic';
import { CategoriesCreateDto } from './dto/categories.create.dto';
import { categoriesUpdateDto } from './dto/categories.put.dto';
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesServic: CategoriesServic) {}

  @Get('/categories')
  async findAll(@Req() req: Request) {
    return await this.categoriesServic.findAll();
  }

  @Post('/categories')
  async categoriesCreate(@Body() body: {}, @Req() req: CategoriesCreateDto) {
    console.log(body);

    return await this.categoriesServic.categoriesCreate(req);
  }

  @Put('/categories/:id')
  async categoriesUpdate(
    @Param() param: string,
    @Req() req?: categoriesUpdateDto,
  ) {
    return await this.categoriesServic.categoriesUpdate(param, req);
  }

  @Delete('/categories/:id')
  async categoriesDelete(@Param() param: string) {
    return await this.categoriesServic.categoriesDelete(param);
  }
}
