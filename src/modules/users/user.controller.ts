import { Controller, Get } from '@nestjs/common';
import { userService } from './user.service';

@Controller()
export class userController {
  constructor(private readonly userService: userService) {}
  @Get('/user')
  getHello(): string {
    return this.userService.getHello();
  }
}
