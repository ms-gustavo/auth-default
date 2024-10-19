import { v4 as uuidv4 } from "uuid";
import {
  EmailContent,
  RegisterUserProps,
  TempUserProps,
} from "../interfaces/interface";
import { AppError } from "../shared/AppError";
import { hashPassword } from "../shared/bcryptFunctions";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import { AuthRegisterEmailNotification } from "../utils/emailMessages";
import { Services } from "../containers/ServicesContainer";
import { Repositories } from "../containers/RepositoryContainer";

export function RegisterTempUserUseCase() {
  async function checkIfTempUserExists(email: string): Promise<void> {
    const tempUserExists: TempUserProps | null =
      await Repositories.tempUserRepository.findByEmail(email);

    if (tempUserExists) {
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
  ): Promise<void> {
    const newConfirmationLink: string = `${process.env
      .CONFIRMATION_URL!}/auth/confirm/${confirmId}`;

    const emailContent: EmailContent = AuthRegisterEmailNotification({
      name,
      newConfirmationLink,
    });

    await Services.emailService.sendEmail({
      email,
      subject: emailContent.subject,
      text: emailContent.text,
    });
  }

  async function execute({
    name,
    email,
    password,
    role,
  }: RegisterUserProps): Promise<{ message: string }> {
    const emailToLowerCase: string = email.toLowerCase();
    await checkIfTempUserExists(emailToLowerCase);
    await Services.findUserService.checkIfUserExists(emailToLowerCase);

    const hashedPassword: string = await hashPassword(password);
    const confirmId: string = uuidv4();

    await Repositories.tempUserRepository.createTempUser({
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
