import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Question } from '../generated/prisma/client';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private cachedTransporter: ReturnType<
    typeof nodemailer.createTransport
  > | null = null;

  private getTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      throw new Error(
        'SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS are not configured',
      );
    }
    if (!this.cachedTransporter) {
      this.cachedTransporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
    }
    return this.cachedTransporter;
  }

  async sendQuestionNotification(question: Question): Promise<void> {
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!to || !from) {
      throw new Error(
        'CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are not configured',
      );
    }

    const transporter = this.getTransporter();
    const who = question.askerName || 'ללא שם';
    const preferencesNote = question.wantsPublishedAnonymous
      ? 'מבקש/ת פרסום אנונימי בשו״ת (בלי פרט מזהה)'
      : 'לא ביקש/ה פרסום בשו״ת.';

    try {
      await transporter.sendMail({
        to,
        from,
        replyTo: question.askerEmail,
        subject: `פנייה חדשה מהאתר — ${who}`,
        text: `${question.question}\n\n---\nמייל ליצירת קשר: ${question.askerEmail}\n${preferencesNote}`,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send notification email for question ${question.id}`,
        error instanceof Error ? error.stack : error,
      );
      throw error;
    }
  }
}
