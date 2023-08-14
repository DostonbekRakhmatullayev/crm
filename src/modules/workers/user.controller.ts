import { Controller, Get } from '@nestjs/common';
import { userService } from './user.service';

@Controller('/user')
export class userController {
  constructor(private readonly userService: userService) {}
  @Get('/:id')
  getHello(): string {
    return this.userService.getHello();
  }
}
