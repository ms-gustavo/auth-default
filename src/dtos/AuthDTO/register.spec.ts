import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { validateDTO } from "../../middlewares/validateDTO";
import { RegisterUserDTO } from "./register";
import { RegisterUserDTOMock } from "./mocksAndUtils";

describe("Create User DTO Validation", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  const middleware = validateDTO(RegisterUserDTO);

  const baseRequestBody = {
    name: RegisterUserDTOMock.name,
    email: RegisterUserDTOMock.email,
    password: RegisterUserDTOMock.password,
    role: RegisterUserDTOMock.role,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = { body: { ...baseRequestBody } };
  });

  it("should pass validation when all fields are provided", async () => {
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
  });
});
