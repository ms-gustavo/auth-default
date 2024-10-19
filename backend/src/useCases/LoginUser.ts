import { User } from "@prisma/client";
import { LoginUserProps, UserProps } from "../interfaces/interface";
import { TokenService } from "../services/Token/TokenService";
import { FindUser } from "../services/User/FindUser";
import { AppError } from "../shared/AppError";
import { comparePassword } from "../shared/bcryptFunctions";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";

const findUser = FindUser();
const tokenService = TokenService();

export function LoginUserUseCase() {
  async function checkIfPasswordIsCorrect(password: string, user: UserProps) {
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        serverStringErrorsAndCodes.P2004.message,
        serverStringErrorsAndCodes.P2004.code
      );
    }
  }

  async function execute({ email, password }: LoginUserProps) {
    const emailToLowerCase: string = email.toLowerCase();
    const user: UserProps = await findUser.checkIfUserExists(emailToLowerCase);

    await checkIfPasswordIsCorrect(password, user);

    const token = await tokenService.generateToken(user);
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;

    return { userWithoutPassword, token };
  }

  return {
    execute,
  };
}
