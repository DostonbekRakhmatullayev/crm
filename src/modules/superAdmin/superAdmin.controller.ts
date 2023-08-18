import {
  Controller,
  Get,
  Req,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  UploadedFile,
} from '@nestjs/common';
// import upload from '../../utils/multer';
import { SuperAdminServic } from './superAdmin.servic';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SuperAdminValidator } from './dto/superadmin.create.dto';
import { multerOptions } from 'src/helpers/multer';
@Controller('/super')
export class SuperAdminController {
  constructor(private readonly superAdminServic: SuperAdminServic) {}

  @Get('/admin')
  async findOne(@Req() req: Request) {
    return await this.superAdminServic.findOne();
  }

  // @Post('/admin')
  // async adminCreate(@Req() req: Request) {
  //   upload.single('images');
  //   console.log(req);
  // }

  @Post('/admin')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() superAdmin: SuperAdminValidator,
  ) {
    console.log('olma');
    console.log(file);
    return await this.superAdminServic.uploadImage(superAdmin);
  }
}
