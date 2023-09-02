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
import { CreateWorkersDto } from './dto/workers.create.dto';
import { WorkersService } from './workers.service';
@Controller('/workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get('/get')
  async findAll() {
    return await this.workersService.findAll();
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersCreate(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: CreateWorkersDto,
  ) {
    return await this.workersService.workersCreate(file, req);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersUpdate(@UploadedFile() file?: Express.Multer.File, @Req() req?) {
    return await this.workersService.workersUpdate(req, file);
  }
}
