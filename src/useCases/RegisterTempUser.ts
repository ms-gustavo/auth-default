import { v4 as uuidv4 } from "uuid";
import { RegisterTempUserProps } from "../interfaces/interface";
import { TempUserRepository } from "../repositories/TempUserRepository";
import { AppError } from "../shared/AppError";
import { hashPassword } from "../shared/bcryptFunctions";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";

const tempUserRepo = TempUserRepository();

async function checkIfTempUserExists(email: string) {
  const userExists = await tempUserRepo.findByEmail(email);

  if (userExists) {
    throw new AppError(
      serverStringErrorsAndCodes.P2002.message,
      serverStringErrorsAndCodes.P2002.code
    );
  }
}

export async function execute({
  name,
  email,
  password,
  role,
}: RegisterTempUserProps) {
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

  //TODO: Lógica de email
  return { message: `Cheque seu e-mail para confirmar o cadastro` };
}
