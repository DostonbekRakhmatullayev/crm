import {
  Controller,
  Get,
  Req,
  Post,
  UseInterceptors,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/helpers/multer';
import { CategoriesServic } from './categories.servic';
import { ChikTokenMiddleware } from 'src/middleware/chiktoken.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesServic: CategoriesServic) {}

  @Get('/categories')
  async findAll(@Req() req: Request) {
    return await this.categoriesServic.findAll();
  }

  @Post('/categories')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() superAdmin,
  ) {
    return await this.categoriesServic.uploadImage(file, superAdmin);
  }

  @Put('/categories')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async putAdmin(@UploadedFile() file?: Express.Multer.File, @Req() req?) {
    return await this.categoriesServic.putAdmin(req, file);
  }

  @Post('/categories')
  async adminLogin(@Req() body) {
    return await this.categoriesServic.adminLogin(body);
  }
}
