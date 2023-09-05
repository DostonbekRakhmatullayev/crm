import {
  Controller,
  Get,
  Req,
  Post,
  UseInterceptors,
  Put,
  Param,
  UploadedFile,
  Delete,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminValidator } from './dto/admin.create.dto';
import { multerOptions } from 'src/helpers/multer';
import { NewsUpdateDto } from './dto/admin.put.dto';
import { LoginValidator } from './dto/login.dto';
import { AdminServic } from './admin.servic';
import { Response } from 'express';
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminServic: AdminServic) {}

  @Get('/get')
  async findOne(@Req() req: Request, @Res() response: Response) {
    // response.sendFile
    return await this.adminServic.findOne(req);
  }

  @Get('/get/all')
  async findAll(@Req() req: Request) {
    return await this.adminServic.findAll(req);
  }

  @Get('/get/all/no')
  async findAllNoActiv(@Req() req: Request) {
    return await this.adminServic.findAllNoActiv(req);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async adminCreate(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AdminValidator,
  ) {
    return await this.adminServic.adminCreate(file, req);
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

  @Delete('/delete/:id')
  async adminDelete(@Req() req?: Response, @Param() param?: string) {
    return await this.adminServic.adminDelete(req, param);
  }
}
