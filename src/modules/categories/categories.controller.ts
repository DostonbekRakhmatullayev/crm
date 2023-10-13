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

import { CategoriesService } from './categories.service';
import { CategoriesCreateDto } from './dto/categories.create.dto';
import { categoriesUpdateDto } from './dto/categories.put.dto';
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/categories')
  async findAll(@Req() req: Request) {
    return await this.categoriesService.findAll();
  }

  @Post('/categories')
  async categoriesCreate(@Body() body: {}, @Req() req: CategoriesCreateDto) {
    return await this.categoriesService.categoriesCreate(req);
  }

  @Put('/categories/:id')
  async categoriesUpdate(
    @Param() param: string,
    @Req() req?: categoriesUpdateDto,
  ) {
    return await this.categoriesService.categoriesUpdate(param, req);
  }

  @Delete('/categories/:id')
  async categoriesDelete(@Param() param: string) {
    return await this.categoriesService.categoriesDelete(param);
  }
}
