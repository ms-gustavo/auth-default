import { UserRepository } from "../../repositories/UserRepository";
import { serverStringErrorsAndCodes } from "../../utils/serverStringErrorsAndCodes";
import { AppError } from "../../shared/AppError";

const user = UserRepository();

export function FindUserService() {
  async function checkIfUserExists(
    email: string,
    provider?: boolean
  ): Promise<void> {
    const userExists = await user.findByEmail(email);
    if (userExists) {
      throw new AppError(
        provider
          ? serverStringErrorsAndCodes.P2001.message
          : serverStringErrorsAndCodes.P2002.message,
        provider
          ? serverStringErrorsAndCodes.P2001.code
          : serverStringErrorsAndCodes.P2002.code
      );
    }
  }

  return {
    checkIfUserExists,
  };
}
