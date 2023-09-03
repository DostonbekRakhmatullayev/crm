import {
  Controller,
  Get,
  Req,
  Post,
  UseInterceptors,
  Put,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminValidator } from './dto/admin.create.dto';
import { multerOptions } from 'src/helpers/multer';
import { NewsUpdateDto } from './dto/admin.put.dto';
import { LoginValidator } from './dto/login.dto';
import { AdminServic } from './admin.servic';
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminServic: AdminServic) {}

  @Get('/get')
  async findOne(@Req() req: Request) {
    return await this.adminServic.findOne(req);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AdminValidator,
  ) {
    return await this.adminServic.uploadImage(file, req);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async putAdmin(
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: NewsUpdateDto,
  ) {
    return await this.adminServic.putAdmin(req, file);
  }

  @Post('/login')
  async adminLogin(@Req() body: LoginValidator) {
    return await this.adminServic.adminLogin(body);
  }
}
