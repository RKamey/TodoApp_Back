export interface SendMail {
  sender: EmailContact[];
  to: EmailContact[];
  htmlContent: string;
  textContent: string;
  subject: string;
}

type EmailContact = {
  email: string;
  name: string;
}