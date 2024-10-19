import jwt from "jsonwebtoken";
import { UserProps } from "../../interfaces/interface";

export function TokenService() {
  async function generateToken(user: UserProps): Promise<string> {
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
