import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SuperAdminServic {
  findOne(): string {
    return 'salom super admindan';
  }

  async uploadImage(superAdmin) {
    try {
      const file = superAdmin.file.originalname;

      const img = Date.now() + file;

      console.log(img);
      fs.writeFileSync(
        path.join(process.cwd(), 'uploads', 'salom.jpg'),
        JSON.stringify(img),
      );

      return 'post';
    } catch (error) {
      console.log(error);
    }
  }
}
