import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().optional(),
  email: z.email("אנא הזן/י כתובת מייל תקינה."),
  message: z.string().min(1, "אנא כתוב/י מה על הלב לפני השליחה."),
  wantsPublishedAnonymous: z.boolean(),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
