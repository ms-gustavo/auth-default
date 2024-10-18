import { v4 as uuidv4 } from "uuid";
import {
  RegisterTempUserProps,
  RegisterUserProps,
} from "../interfaces/interface";
import { TempUserRepository } from "../repositories/TempUserRepository";
import { AppError } from "../shared/AppError";
import { hashPassword } from "../shared/bcryptFunctions";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import { AuthRegisterEmailNotification } from "../utils/emailMessages";
import { EmailService } from "../services/Email/EmailService";

const tempUserRepo = TempUserRepository();
const emailService = EmailService();

export function RegisterTempUserUseCase() {
  async function checkIfTempUserExists(email: string) {
    const userExists = await tempUserRepo.findByEmail(email);

    if (userExists) {
      throw new AppError(
        serverStringErrorsAndCodes.P2002.message,
        serverStringErrorsAndCodes.P2002.code
      );
    }
  }

  async function sendConfirmationEmail(
    name: string,
    email: string,
    confirmId: string
  ) {
    const newConfirmationLink = `${process.env
      .CONFIRMATION_URL!}/auth/confirm/${confirmId}`;

    const emailContent = AuthRegisterEmailNotification({
      name,
      newConfirmationLink,
    });

    await emailService.sendEmail({
      email,
      subject: emailContent.subject,
      text: emailContent.text,
    });
  }

  async function execute({ name, email, password, role }: RegisterUserProps) {
    const emailToLowerCase: string = email.toLowerCase();
    await checkIfTempUserExists(emailToLowerCase);
    //TODO: Validação se usuário já existe

    const hashedPassword = await hashPassword(password);
    const confirmId = uuidv4();

    await tempUserRepo.createTempUser({
      name,
      email: emailToLowerCase,
      password: hashedPassword,
      role,
      confirmId,
    });

    await sendConfirmationEmail(name, emailToLowerCase, confirmId);
    return { message: `Cheque seu e-mail para confirmar o cadastro` };
  }

  return {
    execute,
  };
}
