import { ROLE } from "@prisma/client";

export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  role?: ROLE;
}

export interface RegisterTempUserProps extends RegisterUserProps {
  confirmId: string;
}

export interface SendEmailProps {
  email: string;
  subject: string;
  text: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}

export interface EmailServiceMessagesProps {
  name: string;
  newConfirmationLink: string;
}
