import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
      <h1 className="font-heading text-3xl font-bold md:text-5xl">מדיניות פרטיות</h1>
      <p className="mt-2 text-sm text-text-faint">עודכן לאחרונה: אוגוסט 2026</p>

      <div className="mt-8 space-y-7 leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">כללי</h2>
          <p>
            אתר זה הוא אתר אישי-קהילתי של הרב יעקב זיסהולץ. מסמך זה מסביר איזה מידע
            נאסף באתר, לשם מה, ואיך אפשר לפנות בנוגע אליו.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">איזה מידע נאסף</h2>
          <p>
            בטופס יצירת הקשר נאסף: כתובת אימייל (שדה חובה, כדי שנוכל להשיב), שם (שדה
            רשות), ותוכן הפנייה או השאלה שכתבת. אפשר לבחור לשלוח פנייה בעילום שם.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">
            למה נאסף המידע ומי רואה אותו
          </h2>
          <p>
            המידע משמש אך ורק כדי לענות לך באופן אישי. אם תבחר/י באפשרות פרסום
            השאלה בעמוד "שו״ת אנונימי", היא תפורסם בהתאם לבחירתך — עם שם או בעילום
            שם — ולעולם לא תפורסם כתובת האימייל. הגישה למידע מוגבלת לרב/למפעיל
            האתר בלבד.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">איפה המידע נשמר</h2>
          <p>
            המידע נשמר במסד נתונים מאובטח המתארח אצל ספק תשתית ענן.
            שליחת הודעות המייל מתבצעת דרך ספק שירות דוא״ל חיצוני, לצורך
            תפעולי בלבד — הוא אינו רואה ואינו משתמש בתוכן הפנייה למטרה אחרת.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">תרומות</h2>
          <p>
            תהליך התרומה מתבצע במלואו באתר חיצוני של "נדרים פלוס". פרטי אשראי או
            תשלום אינם נאספים או נשמרים באתר זה כלל.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">עוגיות (Cookies)</h2>
          <p>
            האתר אינו משתמש בעוגיות מעקב או פרסום כלפי מבקרים. קיימת עוגייה טכנית
            אחת בלבד, המשמשת את מנהל האתר לצורך התחברות לפאנל הניהול.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-text">
            מחיקה, עדכון או שאלות
          </h2>
          <p>
            אפשר לפנות בכל עת בבקשה לעיין, לעדכן או למחוק מידע שנשמר, דרך{" "}
            <Link href="/contact" className="font-semibold text-amber">
              טופס יצירת הקשר
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
