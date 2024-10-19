import { TempUserRepository } from "../repositories/TempUserRepository";
import { UserRepository } from "../repositories/UserRepository";

export const Repositories = {
  userRepository: UserRepository(),
  tempUserRepository: TempUserRepository(),
};
