import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImagesServic } from './images.servic';

@Controller()
export class ImagesController {
  constructor(private readonly imagesServic: ImagesServic) {}

  @Get('/:filname')
  async findAll(@Param() param, @Res() res: Response) {
    return await this.imagesServic.findAll(res, param);
  }
}
