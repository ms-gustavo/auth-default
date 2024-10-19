import { UserRepository } from "../../repositories/UserRepository";
import { serverStringErrorsAndCodes } from "../../utils/serverStringErrorsAndCodes";
import { AppError } from "../../shared/AppError";

const user = UserRepository();

export function FindUserService() {
  async function checkIfUserExists(email: string) {
    const userExists = await user.findByEmail(email);

    if (!userExists) {
      throw new AppError(
        serverStringErrorsAndCodes.P2002.message,
        serverStringErrorsAndCodes.P2002.code
      );
    }

    return userExists;
  }

  return {
    checkIfUserExists,
  };
}
