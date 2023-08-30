import { Controller } from '@nestjs/common';
import { CategoriesServic } from './categories.servic';

@Controller('/super')
export class CategoriesController {
  constructor(private readonly categoriesServic: CategoriesServic) {}

  //   @Get('/admin')
  //   async findOne(@Req() req: Request) {
  //     return await this.superAdminServic.findOne(req);
  //   }

  //   @Post('/admin')
  //   @UseInterceptors(FileInterceptor('images', multerOptions))
  //   async uploadImage(
  //     @UploadedFile() file: Express.Multer.File,
  //     @Req() superAdmin: SuperAdminValidator,
  //   ) {
  //     return await this.superAdminServic.uploadImage(file, superAdmin);
  //   }

  //   @Put('/admin/:id')
  //   @UseInterceptors(FileInterceptor('images', multerOptions))
  //   async putAdmin(
  //     @UploadedFile() file: Express.Multer.File,
  //     @Req() req: NewsUpdateDto,
  //     @Param() Params,
  //   ) {
  //     return await this.superAdminServic.putAdmin(req, file, Params);
  //   }

  //   @Post('/login')
  //   async adminLogin(@Req() body: SuperAdminValidator) {
  //     return await this.superAdminServic.adminLogin(body);
  //   }
}
