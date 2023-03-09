import { mail } from "../config/email.config";

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  const send = await mail.sendMail({
    from: `${process.env.SMTP_NAME}\n ${process.env.SMTP_EMAIL}`,
    to,
    subject,
    text,
    html,
  });
  
  try {
    return send.messageId;
  } catch (error) {
    throw error;
  }
};

