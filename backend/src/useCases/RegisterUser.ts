import { User } from "@prisma/client";
import { TempUserRepository } from "../repositories/TempUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { TokenService } from "../services/Token/TokenService";
import { FindUser } from "../services/User/FindUser";
import { AppError } from "../shared/AppError";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import {
  TempUserProps,
  UserProps,
  UserWithoutPasswordProps,
} from "../interfaces/interface";

const userRepository = UserRepository();
const tempUserRepository = TempUserRepository();
const findUser = FindUser();
const tokenService = TokenService();

export function RegisterUserUseCase() {
  async function findTempUserByConfirmId(
    confirmId: string
  ): Promise<TempUserProps> {
    const tempUserExists: TempUserProps | null =
      await tempUserRepository.findByConfirmId(confirmId);
    if (!tempUserExists) {
      throw new AppError(
        serverStringErrorsAndCodes.P2003.message,
        serverStringErrorsAndCodes.P2003.code
      );
    }
    return tempUserExists;
  }

  async function execute(
    confirmId: string
  ): Promise<{ userWithoutPassword: UserWithoutPasswordProps; token: string }> {
    console.log("execute", confirmId);

    const tempUser: TempUserProps = await findTempUserByConfirmId(confirmId);
    await findUser.checkIfUserExists(tempUser.email);

    const user: UserProps = await userRepository.createUser({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: tempUser.role,
    });

    const token: string = await tokenService.generateToken(user);
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).password;

    await tempUserRepository.deleteTempUser(tempUser.email);

    return { userWithoutPassword, token };
  }
  return { execute };
}
