import {
  Controller,
  Get,
  Req,
  Post,
  UseInterceptors,
  Put,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/helpers/multer';
import { CreateWorkersDto } from './dto/workers.create.dto';
import { UpdateUserDto } from './dto/workers.update.dto';
import { WorkersService } from './workers.service';
@Controller('/workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get('/get')
  async findAll() {
    return await this.workersService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param() param: string) {
    return await this.workersService.findOne(param);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersCreate(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: CreateWorkersDto,
  ) {
    return await this.workersService.workersCreate(file, req);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async workersUpdate(
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: UpdateUserDto,
    @Param() param?: string,
  ) {
    return await this.workersService.workersUpdate(req, file, param);
  }

  @Delete('/delete/:id')
  async workerDelete(@Param() param?: string) {
    return await this.workersService.workerDelete(param);
  }
}
