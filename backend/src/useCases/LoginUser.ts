import { User } from "@prisma/client";
import {
  LoginUserProps,
  UserProps,
  UserWithoutPasswordProps,
} from "../interfaces/interface";
import { AppError } from "../shared/AppError";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import { Services } from "../containers/ServicesContainer";
import { Repositories } from "../containers/RepositoryContainer";

export function LoginUserUseCase() {
  async function checkIfPasswordIsCorrect(
    password: string,
    user: UserProps
  ): Promise<void> {
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

  async function checkIfUserIsValid(email: string): Promise<UserProps> {
    const user = await Repositories.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        serverStringErrorsAndCodes.P2003.message,
        serverStringErrorsAndCodes.P2003.code
      );
    }

    return user;
  }

  async function execute({
    email,
    password,
  }: LoginUserProps): Promise<{
    userWithoutPassword: UserWithoutPasswordProps;
    token: string;
  }> {
    const emailToLowerCase: string = email.toLowerCase();
    const user: UserProps = await checkIfUserIsValid(emailToLowerCase);

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
