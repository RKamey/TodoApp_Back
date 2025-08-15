import { SendSmtpEmail } from "@getbrevo/brevo";
import type { SendMail } from "../interfaces/SendMail.interface";
import { brevoClient } from "@config/brevo";

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
    console.log("Email sent successfully:", response);

    return response.body;
  } catch (error) {
    console.error("Error sending email:", email);
  }
}

export const emailService = { sendEmail };