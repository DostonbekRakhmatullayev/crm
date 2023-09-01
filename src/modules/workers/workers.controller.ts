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
import { WorkersService } from './workers.service';
@Controller('/super')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get('/admin')
  async findAll(@Req() req: Request) {
    return await this.workersService.findAll(req);
  }

  @Post('/admin')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersCreate(
    @UploadedFile() file: Express.Multer.File,
    @Req() superAdmin,
  ) {
    return await this.workersService.workersCreate(file, superAdmin);
  }

  @Put('/admin')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersUpdate(@UploadedFile() file?: Express.Multer.File, @Req() req?) {
    return await this.workersService.workersUpdate(req, file);
  }
}
