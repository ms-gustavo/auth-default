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

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface RegisterUserProps extends LoginUserProps {
  name: string;
  role?: ROLE;
}

export interface RegisterTempUserProps extends RegisterUserProps {
  confirmId: string;
}

export interface SendEmailProps {
  email: string;
  subject: string;
  text?: string;
  html?: string;
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
  newConfirmationLink?: string;
}

export interface HtmlTemplateProps {
  service: string;
  userName: string;
  email: string;
  site: string;
}

export interface GitHubProfile {
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  emails: { value: string }[];
  photos: { value: string }[];
}

export interface GitHubStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}
