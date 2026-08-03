import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [PrismaModule, QuestionsModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
