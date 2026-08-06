"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never see or fill this field. Bots that auto-fill
  // every input do, so treat a non-empty value as spam and bail out quietly.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const message = formData.get("message");

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name || !email || !message) {
    return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return { status: "error" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New Volt logistics inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return { status: "error" };
  }

  return { status: "success" };
}
