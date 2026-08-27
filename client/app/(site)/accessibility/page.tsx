import Link from "next/link";

export const metadata = {
  title: "הצהרת נגישות",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">הצהרת נגישות</h1>
      <p className="mt-2 text-sm text-text-faint">עודכן לאחרונה: אוגוסט 2026</p>

      <div className="mt-8 space-y-7 leading-relaxed text-text-muted">
        <section>
          <p>
            אנחנו רואים חשיבות רבה בכך שהאתר יהיה נגיש וזמין לכלל הגולשים, כולל
            אנשים עם מוגבלויות, ופועלים להתאמתו לתקן הנגישות הבינלאומי WCAG 2.1
            ברמה AA ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">
            מה נעשה בפועל
          </h2>
          <ul className="list-inside list-disc space-y-1">
            <li>מבנה HTML סמנטי ותמיכה מלאה בכיווניות עברית מימין לשמאל (RTL)</li>
            <li>טקסט חלופי (alt) לתמונות משמעותיות באתר</li>
            <li>ניגודיות צבעים המותאמת לקריאות נוחה בערכת עיצוב כהה</li>
            <li>תפריט ניווט הפעיל גם מהמקלדת</li>
          </ul>
        </section>

        <section>
          <p>
            הצהרה זו נכתבה בתום לב ומשקפת מאמץ מתמשך — היא אינה תעודת נגישות
            שהונפקה על ידי בודק נגישות מוסמך. אנחנו ממשיכים לבדוק ולשפר את נגישות
            האתר באופן שוטף.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">
            נתקלת בבעיית נגישות?
          </h2>
          <p>
            נשמח שתפנה/י אלינו דרך{" "}
            <Link href="/contact" className="font-semibold text-amber">
              טופס יצירת הקשר
            </Link>{" "}
            ונטפל בפנייה בהקדם האפשרי.
          </p>
        </section>
      </div>
    </div>
  );
}
