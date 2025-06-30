import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const targetEmail = process.env.EMAIL_TARGET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // 1. Send the email to your primary address (info.futuremore@gmail.com)
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: targetEmail,
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email, // This allows you to reply directly to the user's email
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p>You have received a new message from your website's contact form.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    // 2. (Optional but recommended) Send a confirmation email to the user
    await resend.emails.send({
      from: "Future & More Inc. <onboarding@resend.dev>",
      to: email,
      subject: "We've Received Your Message!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Thank you for contacting us, ${name}!</h2>
            <p>We have successfully received your message and will get back to you as soon as possible.</p>
            <p><strong>Here's a copy of your message:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; padding-left: 1em; margin-left: 1em; color: #555;">
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            </blockquote>
            <p>Best regards,<br>The Future & More Team</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
