import { BcryptService } from "../services/Bcrypt/BcryptService";
import { EmailService } from "../services/Email/EmailService";
import { TokenService } from "../services/Token/TokenService";
import { FindUserService } from "../services/User/FindUserService";

export const Services = {
  findUserService: FindUserService(),
  tokenService: TokenService(),
  emailService: EmailService(),
  bcryptService: BcryptService(),
};
