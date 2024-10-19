import {
  EmailServiceMessagesProps,
  HtmlTemplateProps,
} from "../interfaces/interface";
import { generateHtmlTemplate } from "../shared/emailHtmlTemplate";

export const AuthRegisterEmailNotification = ({
  name,
  newConfirmationLink,
}: EmailServiceMessagesProps) => {
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
}: HtmlTemplateProps) => {
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
