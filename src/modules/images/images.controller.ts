import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('/:filename')
  async findAll(@Param() param, @Res() res: Response) {
    return await this.imagesService.findAll(res, param);
  }
}
