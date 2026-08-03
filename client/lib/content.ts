export type YoutubeVideo = {
  youtubeId: string;
  title: string;
};

export const heroVideo: YoutubeVideo = {
  youtubeId: "8-d7cf7xvOk",
  title: "הרב יעקב זיסהולץ- המשיח נמצא בארצנו ובפועל מתחת לפני השטח !! אדיר❗",
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  tags: string[];
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
};

export const books: Book[] = [
  { id: "lev-chadash", title: "לב חדש", subtitle: "על תשובה בגובה העיניים", price: 48 },
  { id: "or-balaila", title: "אור בלילה", subtitle: "חיזוקים לזמנים קשים", price: 52 },
  { id: "derech-habaita", title: "דרך הביתה", subtitle: "שיחות עם בני נוער", price: 45 },
  { id: "maamin-bach", title: "מאמין בך", subtitle: "על כוחה של קימה", price: 55 },
];

export const donationPresets = [
  { amount: 26, label: "שיחה לנער אחד" },
  { amount: 104, label: "סרטון חיזוק חדש", featured: true },
  { amount: 180, label: "ליווי חודשי לנער" },
];

// Nedarim Plus deep link: pre-selects and locks the "מדרשיה לנוער נושר בבני ברק" cause
// via the `groupe`/`groupelock` params (matched by exact name string on their end).
const NEDARIM_PLUS_CAUSE = 'מדרשיה לנוער נושר בבני ברק - " המדרשיה של פרדס כץ" ';

export const donationLink =
  `https://www.matara.pro/nedarimplus/online/?mosad=7009994` +
  `&groupe=${encodeURIComponent(NEDARIM_PLUS_CAUSE)}&groupelock=1`;

export type Inquiry = {
  id: string;
  excerpt: string;
  topic: string;
  received: string;
  status: "חדשה" | "דחוף" | "בטיפול" | "נענתה";
};

export const inquiries: Inquiry[] = [
  {
    id: "A-2841",
    excerpt: '"אני כבר חודש לא מצליח לקום לתפילה ומרגיש שאין טעם…"',
    topic: "משהו אישי",
    received: "לפני 14 דק׳",
    status: "חדשה",
  },
  {
    id: "A-2840",
    excerpt: '"ההורים שלי רבים כל היום ואני לא עומד בזה יותר…"',
    topic: "אני בקטע דחוף",
    received: "לפני שעה",
    status: "דחוף",
  },
  {
    id: "A-2839",
    excerpt: '"רציתי לשאול את הרב על שמירת הברית, קשה לי מאוד…"',
    topic: "שאלה לרב",
    received: "לפני 3 שע׳",
    status: "בטיפול",
  },
  {
    id: "A-2838",
    excerpt: '"תודה על התשובה, זה ממש עזר לי. אפשר לשאול עוד משהו?"',
    topic: "המשך שיחה",
    received: "אתמול",
    status: "נענתה",
  },
];
