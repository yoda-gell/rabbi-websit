# אתר הרב - Rabbi Website

## סקירת הפרויקט

אתר הרב הוא אתר Next.js 16 עם TypeScript ו-Tailwind CSS המיועד לקהילה דתית.

**מטרת האתר:** הצגת שיעורי תורה מיוטיוב, מערכת שאלות-ותשובות, לוח שיעורים, עמוד תרומות ועמוד אודות.

## סטאק טכנולוגי

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime:** Node.js 24 LTS
- **Package Manager:** npm 11

## מבנה הפרויקט

```
src/
  app/
    layout.tsx          ← Root layout עם RTL ו-dir="rtl"
    page.tsx            ← דף הבית
    shiurim/            ← שיעורי תורה (סרטוני יוטיוב)
    shaalot/            ← שאלות ותשובות
    luach/              ← לוח שיעורים ואירועים
    tmicha/             ← עמוד תרומות
    odot/               ← אודות הרב
  components/
    ui/                 ← קומפוננטות UI בסיסיות
    layout/             ← Header, Footer, Nav
```

## עקרונות ופרקטיקות מרכזיות

### RTL ועברית
- כל הדפים הם **RTL** (`dir="rtl"` ו-`lang="he"` ב-layout.tsx)
- שפת הממשק: עברית
- פונטים: Heebo (ראשי) + Frank Ruhl Libre (כותרות) - Google Fonts

### נגישות (Accessibility)
- יעד: WCAG 2.1 AA
- תמיד להשתמש ב-semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- `aria-label` על כל אלמנט אינטראקטיבי שאין לו טקסט ברור
- כפתורים עם focus styles ברורים
- ניגודיות צבעים מינימום 4.5:1

### מובייל-ראשית (Mobile-First)
- תכנון תמיד מהמסך הקטן ביותר לגדול
- Breakpoints: `sm:`, `md:`, `lg:` (לא `xl:` אלא אם נדרש)
- Touch targets מינימום 44×44px

### קוד
- TypeScript strict mode
- אין `any` - תמיד להגדיר טיפוסים
- קומפוננטות: PascalCase
- קבצים: kebab-case
- Server Components כברירת מחדל, `"use client"` רק כשנדרש

## פקודות נפוצות

```bash
npm run dev        # פיתוח מקומי (http://localhost:3000)
npm run build      # בניה לפרודקשן
npm run lint       # בדיקת ESLint
```

## תכנון עמודים

| עמוד | נתיב | תיאור |
|------|-------|-------|
| בית | `/` | hero + קישורים מהירים |
| שיעורים | `/shiurim` | גריד סרטוני יוטיוב |
| שאלות | `/shaalot` | צ'אט + שאלות שפורסמו |
| לוח | `/luach` | לוח שיעורים שבועי/חודשי |
| תרומה | `/tmicha` | עמוד תרומות (PayPal/כרטיס) |
| אודות | `/odot` | ביוגרפיה + תמונה |

## הוספת תכונות חדשות

1. Server Component תמיד אלא אם נדרש state/effect → `"use client"`
2. Type החדש ב-`src/types/` אם נדרש
3. שמות עבריים לקבצים: **אין** - רק אנגלית
4. כל תמונה: `next/image` עם `alt` בעברית
