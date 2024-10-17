import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { validateDTO } from "../../middlewares/validateDTO";
import { LoginUserDTO } from "./login";
import {
  errorMock,
  errorsMessages,
  removeKeyFromBody,
  UserDTOMock,
} from "./mocksAndUtils";

describe.only("Login User DTO Validation", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  const middleware = validateDTO(LoginUserDTO);
  async function callMiddleware() {
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
  }

  const baseRequestBody = {
    email: UserDTOMock.email,
    password: UserDTOMock.password,
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
    await callMiddleware();
    expect(nextFunction).toHaveBeenCalled();
  });

  it("should fail validation when email is missing", async () => {
    removeKeyFromBody(mockRequest, "email");
    await callMiddleware();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("email", [
        errorsMessages.email.required,
        errorsMessages.email.invalid,
      ])
    );
  });

  it("should fail validation when password is missing", async () => {
    removeKeyFromBody(mockRequest, "password");
    await callMiddleware();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("password", [
        errorsMessages.password.required,
        errorsMessages.password.invalid,
      ])
    );
  });
});
