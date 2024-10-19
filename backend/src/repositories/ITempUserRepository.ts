import { RegisterTempUserProps, TempUserProps } from "../interfaces/interface";

export interface ITempUserRepository {
  findByEmail(email: string): Promise<TempUserProps | null>;
  findByConfirmId(confirmId: string): Promise<TempUserProps | null>;
  createTempUser({
    name,
    email,
    password,
    role,
    confirmId,
  }: RegisterTempUserProps): Promise<TempUserProps>;
  deleteTempUser(email: string): Promise<TempUserProps>;
}
