import { Injectable } from '@nestjs/common';

@Injectable()
export class userService {
  getHello(): string {
    return 'salom';
  }
}
