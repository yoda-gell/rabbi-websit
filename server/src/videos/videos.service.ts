import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVideoDto) {
    return this.prisma.video.create({ data: dto });
  }

  findAllPublished() {
    return this.prisma.video.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForAdmin(id: string) {
    const video = await this.prisma.video.findUnique({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Video ${id} not found`);
    }
    return video;
  }

  async update(id: string, dto: UpdateVideoDto) {
    await this.findOneForAdmin(id);
    return this.prisma.video.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOneForAdmin(id);
    return this.prisma.video.delete({ where: { id } });
  }
}
