import { ROLE } from "@prisma/client";
import { Request } from "express";

export function removeKeyFromBody(mockRequest: Partial<Request>, key: string) {
  const newBody = { ...mockRequest.body };
  delete newBody[key];
  mockRequest.body = newBody;
}

export const errorMock = (field: string, messages: string[]) => ({
  message: "Erro de validação",
  errors: expect.arrayContaining([
    expect.objectContaining({
      field: field,
      errors: expect.arrayContaining(messages),
    }),
  ]),
});

export const UserDTOMock = {
  name: "Test User",
  email: "test@test.com",
  password: "password123",
  role: ROLE.USER,
};

export const errorsMessages = {
  name: {
    required: "O nome é obrigatório",
    invalid: "Nome inválido, tente novamente",
  },
  email: {
    required: "O email é obrigatório",
    invalid: "Email inválido, tente novamente",
  },
  password: {
    required: "A senha é obrigatória",
    invalid: "Senha inválida, tente novamente",
    min: "A senha deve ter no mínimo 6 caracteres",
    max: "A senha deve ter no máximo 20 caracteres",
  },
  role: {
    invalid: "Tipo de usuário inválido, tente novamente",
  },
};
