import {
  EmailServiceMessagesProps,
  HtmlTemplateProps,
} from "../interfaces/interface";
import { generateHtmlTemplate } from "../shared/emailHtmlTemplate";

export const AuthRegisterEmailNotification = ({
  name,
  newConfirmationLink,
}: EmailServiceMessagesProps): { subject: string; text: string } => {
  return {
    subject: `Confirme seu cadastro`,
    text: `Olá ${name}, \n\nClique no link para confirmar seu cadastro: ${newConfirmationLink}`,
  };
};

export const AuthConfirmRegistrationEmailNotification = ({
  service,
  userName,
  email,
  site,
}: HtmlTemplateProps): { subject: string; html: string } => {
  return {
    subject: `Cadastro realizado com sucesso`,
    html: generateHtmlTemplate({
      service,
      userName,
      email,
      site,
    } as HtmlTemplateProps),
  };
};
