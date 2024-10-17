import prisma from "../../prisma/prisma";
import { RegisterTempUserProps } from "../interfaces/interface";

async function findByEmail(email: string) {
  return await prisma.userTemp.findUnique({
    where: { email },
  });
}

async function findByConfirmId(confirmId: string) {
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
}: RegisterTempUserProps) {
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

async function deleteTempUser(email: string) {
  return await prisma.userTemp.delete({
    where: { email },
  });
}
