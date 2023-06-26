import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [AuthModule, CrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
