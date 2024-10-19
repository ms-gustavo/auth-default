import bcrypt from "bcryptjs";

export function BcryptService() {
  async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  }

  async function comparePassword(password: string, hashedPassword: string) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    return passwordMatch;
  }

  return {
    hashPassword,
    comparePassword,
  };
}
