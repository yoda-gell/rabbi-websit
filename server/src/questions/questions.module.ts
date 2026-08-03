import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AdminQuestionsController } from './admin-questions.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [QuestionsController, AdminQuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
