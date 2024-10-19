import { ROLE } from "@prisma/client";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithoutPasswordProps extends Omit<UserProps, "password"> {}

export interface TempUserProps extends Omit<UserProps, "updatedAt"> {
  confirmId: string;
}

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

export interface EmailContent
  extends Omit<SendEmailProps, "email" | "attachments"> {}

export interface EmailServiceMessagesProps {
  name: string;
  newConfirmationLink: string;
}
