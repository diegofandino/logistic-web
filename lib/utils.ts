import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Language } from "./locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailHtml({
  name,
  company,
  email,
  message,
  locale,
}: {
  name: string;
  company?: string;
  email: string;
  message: string;
  locale: Language;
}): string {

  const isSpanish = locale === 'es';

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:#6b7280;font-size:13px;width:100px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px;">${value}</td>
    </tr>`;

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#0f172a;padding:20px 24px;">
                <span style="color:#ffffff;font-size:15px;font-weight:600;letter-spacing:0.02em;">
                  <span style="color:#f97316;">LOGISTICS</span>
                </span>
                <div style="color:#94a3b8;font-size:12px;margin-top:2px;">${isSpanish ? "Nuevo formulario de contacto" : "New contact form submission"}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row(isSpanish ? "Nombre" : "Name", escapeHtml(name))}
                  ${row(isSpanish ? "Compañía" : "Company", company ? escapeHtml(company) : "—")}
                  ${row(isSpanish ? "Email" : "Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0f172a;text-decoration:underline;">${escapeHtml(email)}</a>`)}
                  ${row(isSpanish ? "Idioma" : "Locale", locale.toUpperCase())}
                </table>
                <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
                  <div style="color:#6b7280;font-size:13px;margin-bottom:6px;">${isSpanish ? "Mensaje" : "Message"}</div>
                  <div style="color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}