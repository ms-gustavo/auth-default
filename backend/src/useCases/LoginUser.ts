import { User } from "@prisma/client";
import { LoginUserProps, UserProps } from "../interfaces/interface";
import { AppError } from "../shared/AppError";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import { Services } from "../containers/ServicesContainer";

export function LoginUserUseCase() {
  async function checkIfPasswordIsCorrect(password: string, user: UserProps) {
    const isPasswordValid = await Services.bcryptService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        serverStringErrorsAndCodes.P2004.message,
        serverStringErrorsAndCodes.P2004.code
      );
    }
  }

  async function execute({ email, password }: LoginUserProps) {
    const emailToLowerCase: string = email.toLowerCase();
    const user: UserProps = await Services.findUserService.checkIfUserExists(
      emailToLowerCase
    );

    await checkIfPasswordIsCorrect(password, user);

    const token = await Services.tokenService.generateToken(user);
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;

    return { userWithoutPassword, token };
  }

  return {
    execute,
  };
}
