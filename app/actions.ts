"use server";
import { buildContactEmailHtml } from "@/lib/utils";
import z from "zod";
import { Resend } from 'resend';
import { Language } from "@/lib/locale";

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
  company: z.string().optional(),
  message: z.string().min(10),
  website: z.string().optional()
})

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

export async function sendContactMessage(
  locale: Language,
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {

  const raw = Object.fromEntries(formData);
  const result = formSchema.safeParse(raw);

  if (!result.success) {
    return {
      status: 'error', errors: result.error.flatten().fieldErrors,
      message: 'Error parsing form data. Please check your input.'
    }
  }
  // Honeypot: real users never see or fill this field. Bots that auto-fill
  // every input do, so treat a non-empty value as spam and bail out quietly.
  const honeypot = result.data.website;
  if (honeypot) {
    return {
      status: "success",
      message: "Message sent successfully!"
    };
  }

  const name = result.data.name;
  const email = result.data.email;
  const company = result.data.company;
  const message = result.data.message;

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return {
      status: "error",
      message: "Error: Email recipient not configured. Please contact support."
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Logistics <onboarding@resend.dev>",
      to,
      subject: `${locale === "es" ? "Nuevo formulario de contacto" : "New contact form submission"} ${name}${company ? ` (${company})` : ""}`,
      html: buildContactEmailHtml({ name, company, email, message, locale })
    });

    if (error) {
      console.error("Resend returned an error", error);
      return {
        status: "error",
        message: "Failed to send email. Please try again later."
      };
    }
  } catch (error) {
    console.error("Failed to send contact email", error);
    return {
      status: "error",
      message: "Error sending email. Please try again later."
    };
  }

  return { status: "success", message: "Message sent successfully!" };
}
