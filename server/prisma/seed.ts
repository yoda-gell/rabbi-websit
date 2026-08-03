import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const legacyFaqs = [
  {
    id: 'no-feeling-in-prayer',
    question: 'אני מתפלל ולא מרגיש כלום. זה אומר שאני רחוק?',
    answer:
      'ממש להפך. מי ש"לא מרגיש כלום" ובכל זאת בא — התפילה שלו יקרה פי כמה. הרגש בא והולך; הקשר נבנה דווקא מהרגעים היבשים…',
    labels: ['אמונה', 'תפילה'],
  },
  {
    id: 'falling-again',
    question: 'נפלתי שוב באותו דבר. יש בכלל טעם לנסות?',
    answer:
      'דווקא זה שכואב לך — סימן שאכפת לך. נפילה היא לא סוף הדרך, היא חלק ממנה. הרב מסביר למה כל קימה שווה יותר מאלף נפילות…',
    labels: ['נפילות'],
  },
  {
    id: 'parents-dont-understand',
    question: 'ההורים שלי לא מבינים אותי בכלל. מה עושים?',
    answer:
      'קודם כל — אתה לא לבד בהרגשה הזאת. הרב מציע כמה דרכים לפתוח שיחה גם כשנדמה שאין מה לדבר…',
    labels: ['בית'],
  },
  {
    id: 'friends-pull-me',
    question: 'חברים מושכים אותי למקומות לא טובים. איך אומרים לא?',
    answer:
      'לומר "לא" זה כוח, לא חולשה. הרב נותן כמה משפטים פשוטים שאפשר להשתמש בהם בפעם הבאה…',
    labels: ['חברה'],
  },
];

async function main() {
  for (const faq of legacyFaqs) {
    const data = {
      question: faq.question,
      answer: faq.answer,
      labels: faq.labels,
      isPublished: true,
      status: 'ANSWERED',
      wantsPublishedAnonymous: true,
      askerEmail: 'legacy@example.com',
      askerName: null,
    };
    await prisma.question.upsert({
      where: { id: faq.id },
      update: data,
      create: { id: faq.id, ...data },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
