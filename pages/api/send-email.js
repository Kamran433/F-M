import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const targetEmail = process.env.EMAIL_TARGET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { from, subject, htmlContent, confirmationSubject, confirmationHtml } =
    req.body;

  if (!from || !subject || !htmlContent) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Send the email to your info.futuremore@gmail.com address
    await resend.emails.send({
      from: "onboarding@resend.dev", // Resend requires a 'from' address. This is a default.
      to: targetEmail,
      subject: subject,
      html: htmlContent,
      reply_to: from, // Set the user's email as the reply-to address
    });

    // 2. Send a confirmation email to the user who submitted the form
    if (confirmationSubject && confirmationHtml) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: from,
        subject: confirmationSubject,
        html: confirmationHtml,
      });
    }

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
