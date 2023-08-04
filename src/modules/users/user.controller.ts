import { Controller, Get } from '@nestjs/common';
import { userService } from './user.service';

@Controller('/user')
class userController {
  constructor(private readonly userService: userService) {}
  @Get('/:id')
  getHello(): string {
    return this.userService.getHello();
  }
}

const d: any = new userController(userService as any);

export { userController };
