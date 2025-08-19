import { SendSmtpEmail } from "@getbrevo/brevo";
import type { SendMail } from "../interfaces/SendMail.interface";
import { brevoClient } from "@config/brevo";
import { envs } from "@config/envs";
import { getVerificationTemplate } from "../utils/getVerificationTemplate";

const sendEmail = async (email: SendMail) => {
  try {
    const { sender, to, subject, htmlContent, textContent } = email;
    const message = new SendSmtpEmail();
    message.sender = { email: sender[0].email, name: sender[0].name };
    message.to = [{ email: to[0].email, name: to[0].name }];
    message.subject = subject;
    message.htmlContent = htmlContent;
    message.textContent = textContent;

    const response = await brevoClient.sendTransacEmail(message);

    return response.body;
  } catch (error) {
    console.error("Error sending email:", email);
  }
}

const sendVerificationEmail = async (to: string, token: string, userName?: string) => {
  const verificationUrl = `${envs.FRONTEND_URL}/verify-email?token=${token}`;
  const logoUrl = envs.APP_LOGO;

  return sendEmail({
    sender: [{ email: envs.BREVO_SENDER_EMAIL!, name: envs.BREVO_SENDER_NAME! }],
    to: [{ email: to, name: userName || '' }],
    subject: "Taskify - Verify your email",
    htmlContent: getVerificationTemplate({
      verificationUrl,
      userName,
      logoUrl
    }),
    textContent: `Click the link below to verify your email:\n${verificationUrl}`
  });
}

export const emailService = { sendEmail, sendVerificationEmail };
