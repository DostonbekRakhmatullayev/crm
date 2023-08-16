import { Controller, Get, Req } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { SuperAdminServic } from './superAdmin.servic';

@Controller('/super')
export class SuperAdminController {
  constructor(private readonly superAdminServic: SuperAdminServic) {}

  @Get('/admin')
  async findOne(@Req() req: Request) {
    return await this.superAdminServic.findOne();
  }

  @Post('/admin')
  async adminCreate(@Req() req: Request) {}
}
