import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesServic } from './images.servic';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [ImagesServic],
})
export class ImgModule {}
