import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger(QuestionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateQuestionDto) {
    const question = await this.prisma.question.create({ data: dto });

    try {
      await this.mail.sendQuestionNotification(question);
    } catch (error) {
      // The question was already saved successfully — a failed notification
      // email must not fail this request. Just log it.
      this.logger.error(
        `Question ${question.id} saved but notification email failed`,
        error instanceof Error ? error.stack : error,
      );
    }

    return question;
  }

  findAllPublished() {
    return this.prisma.question.findMany({
      where: { isPublished: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePublished(id: string) {
    const question = await this.prisma.question.findFirst({
      where: { id, isPublished: true, deletedAt: null },
    });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found`);
    }
    return question;
  }

  findAllForAdmin() {
    return this.prisma.question.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForAdmin(id: string) {
    const question = await this.prisma.question.findFirst({
      where: { id, deletedAt: null },
    });
    if (!question) {
      throw new NotFoundException(`Question ${id} not found`);
    }
    return question;
  }

  async update(id: string, dto: UpdateQuestionDto) {
    await this.findOneForAdmin(id);
    return this.prisma.question.update({ where: { id }, data: dto });
  }

  async softDelete(id: string) {
    await this.findOneForAdmin(id);
    return this.prisma.question.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
