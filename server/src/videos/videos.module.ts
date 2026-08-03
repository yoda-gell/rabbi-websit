import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { AdminVideosController } from './admin-videos.controller';

@Module({
  controllers: [VideosController, AdminVideosController],
  providers: [VideosService],
})
export class VideosModule {}
