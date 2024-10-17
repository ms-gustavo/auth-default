import { ROLE } from "@prisma/client";
import { Request } from "express";

export function removeKeyFromBody(mockRequest: Partial<Request>, key: string) {
  const newBody = { ...mockRequest.body };
  delete newBody[key];
  mockRequest.body = newBody;
}

export const RegisterUserDTOMock = {
  name: "Test User",
  email: "test@test.com",
  password: "password123",
  role: ROLE.USER,
};
