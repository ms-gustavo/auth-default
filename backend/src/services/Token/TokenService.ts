import jwt from "jsonwebtoken";
import { ProviderUserProps, UserProps } from "../../interfaces/interface";

export function TokenService() {
  async function generateToken(
    user: UserProps | ProviderUserProps
  ): Promise<string> {
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }

  return {
    generateToken,
  };
}
