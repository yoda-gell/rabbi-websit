import { Exclude } from 'class-transformer';
import type { Question } from '../../generated/prisma/client';

export class QuestionEntity implements Question {
  id: string;
  askerName: string | null;

  @Exclude()
  askerEmail: string;

  wantsPublishedAnonymous: boolean;
  question: string;
  answer: string | null;
  isPublished: boolean;
  status: string;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(partial: Partial<QuestionEntity>) {
    Object.assign(this, partial);
  }
}
