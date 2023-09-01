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
import { SuperAdminServic } from './superAdmin.servic';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuperAdminValidator } from './dto/superadmin.create.dto';
import { multerOptions } from 'src/helpers/multer';
import { NewsUpdateDto } from './dto/superadmin.put.dto';
import { LoginValidator } from './dto/login.dto';
@Controller('/super')
export class SuperAdminController {
  constructor(private readonly superAdminServic: SuperAdminServic) {}

  @Get('/admin')
  async findOne(@Req() req: Request) {
    return await this.superAdminServic.findOne(req);
  }

  @Post('/admin')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() superAdmin: SuperAdminValidator,
  ) {
    return await this.superAdminServic.uploadImage(file, superAdmin);
  }

  @Put('/admin')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async putAdmin(
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: NewsUpdateDto,
  ) {
    return await this.superAdminServic.putAdmin(req, file);
  }

  @Post('/login')
  async adminLogin(@Req() body: LoginValidator) {
    return await this.superAdminServic.adminLogin(body);
  }
}
