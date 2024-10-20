import { Services } from "../../containers/ServicesContainer";
import { ROLE } from "@prisma/client";

export function GenerateProviderUserService() {
  async function generate(
    name: string,
    userId: string,
    isGitHub: boolean,
    email?: string
  ) {
    if (!isGitHub && email) {
      await Services.findUserService.checkIfUserExists(email, true);
    }

    const user = {
      id: userId,
      name,
      role: ROLE.USER,
      email: email || undefined,
    };

    const token = await Services.tokenService.generateToken(user);
    return { user, token };
  }

  return { generate };
}
