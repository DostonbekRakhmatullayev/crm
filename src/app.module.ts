import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './modules/users/user.module';

@Module({
  imports: [userModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
