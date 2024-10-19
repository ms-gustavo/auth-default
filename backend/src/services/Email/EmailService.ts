import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { SendEmailProps } from "../../interfaces/interface";
import { AppError } from "../../shared/AppError";
import { serverStringErrorsAndCodes } from "../../utils/serverStringErrorsAndCodes";
dotenv.config();

const emailUser = process.env.EMAIL_USER!;
const emailPass = process.env.EMAIL_PASS!;
const gmailService = process.env.EMAIL_SERVICE!;

const transporter = nodemailer.createTransport({
  service: gmailService,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export function EmailService() {
  async function sendEmail({
    email,
    subject,
    text,
    html,
    attachments,
  }: SendEmailProps): Promise<void> {
    const mailOptions = {
      from: emailUser,
      to: email,
      subject,
      text,
      html: html ? html : undefined,
      attachments: attachments ? attachments : undefined,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
      console.error(
        `Erro ao enviar email para ${email}: ${(error as Error).message}`
      );
      throw new AppError(
        serverStringErrorsAndCodes.P2029.message,
        serverStringErrorsAndCodes.P2029.code
      );
    }
  }

  return {
    sendEmail,
  };
}
