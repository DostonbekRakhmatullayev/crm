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
  Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminCreateDto } from './dto/admin.create.dto';
import { multerOptions } from 'src/helpers/multer';
import { AdminUpdateDto } from './dto/admin.put.dto';
import { AdminLoginDto } from './dto/admin.login.dto';
import { AdminService } from './admin.service';
import { Response } from 'express';
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/get')
  async findOne(@Req() req: Request) {
    return await this.adminService.findOne(req);
  }

  @Get('/get/all')
  async findAll(@Req() req: Request) {
    return await this.adminService.findAll(req);
  }

  @Get('/get/all/no')
  async findAllNoActive(@Req() req: Request) {
    return await this.adminService.findAllNoActive(req);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async adminCreate(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AdminCreateDto,
  ) {
    return await this.adminService.adminCreate(file, req);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async putAdmin(
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: AdminUpdateDto,
  ) {
    return await this.adminService.adminUpdate(req, file);
  }

  @Post('/login')
  async adminLogin(@Body() body: AdminLoginDto) {
    return await this.adminService.adminLogin(body);
  }

  @Delete('/delete/:id')
  async adminDelete(@Req() req?: Response, @Param() param?: string) {
    return await this.adminService.adminDelete(req, param);
  }
}
