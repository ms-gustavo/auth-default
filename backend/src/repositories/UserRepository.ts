import prisma from "../../prisma/prisma";
import { UserProps } from "../interfaces/interface";

export function UserRepository() {
  async function findByEmail(email: string): Promise<UserProps | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async function findById(id: string): Promise<UserProps | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async function createUser({
    name,
    email,
    password,
    role,
  }: UserProps): Promise<UserProps> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
  }

  async function deleteUser(id: string): Promise<UserProps> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  return {
    findByEmail,
    findById,
    createUser,
    deleteUser,
  };
}
