import { Module } from '@nestjs/common';
import { userModule } from './modules/users/user.module';

@Module({
  imports: [userModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
