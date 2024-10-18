import { EmailServiceMessagesProps } from "../interfaces/interface";

export const AuthRegisterEmailNotification = ({
  name,
  newConfirmationLink,
}: EmailServiceMessagesProps) => {
  return {
    subject: `Confirme seu cadastro`,
    text: `Olá ${name}, \n\nClique no link para confirmar seu cadastro: ${newConfirmationLink}`,
  };
};
