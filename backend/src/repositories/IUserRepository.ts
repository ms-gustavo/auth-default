import { UserProps } from "../interfaces/interface";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserProps | null>;
  findById(id: string): Promise<UserProps | null>;
  createUser({ name, email, password, role }: UserProps): Promise<UserProps>;
  deleteUser(id: string): Promise<UserProps>;
}
