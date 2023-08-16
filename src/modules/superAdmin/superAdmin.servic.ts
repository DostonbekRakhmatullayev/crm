import { Injectable } from '@nestjs/common';
@Injectable()
export class SuperAdminServic {
  findOne(): string {
    return 'salom super admindan';
  }

  adminCreate(user) {
    console.log(user);

    return 'post';
  }
}
