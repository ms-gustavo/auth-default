import prisma from "../../prisma/prisma";
import { RegisterTempUserProps, TempUserProps } from "../interfaces/interface";
import { ITempUserRepository } from "./ITempUserRepository";

export function TempUserRepository(): ITempUserRepository {
  async function findByEmail(email: string): Promise<TempUserProps | null> {
    return await prisma.userTemp.findUnique({
      where: { email },
    });
  }

  async function findByConfirmId(
    confirmId: string
  ): Promise<TempUserProps | null> {
    return await prisma.userTemp.findUnique({
      where: { confirmId },
    });
  }

  async function createTempUser({
    name,
    email,
    password,
    role,
    confirmId,
  }: RegisterTempUserProps): Promise<TempUserProps> {
    return await prisma.userTemp.create({
      data: {
        name,
        email,
        password,
        role,
        confirmId,
      },
    });
  }

  async function deleteTempUser(email: string): Promise<TempUserProps> {
    return await prisma.userTemp.delete({
      where: { email },
    });
  }

  return {
    findByEmail,
    findByConfirmId,
    createTempUser,
    deleteTempUser,
  };
}
