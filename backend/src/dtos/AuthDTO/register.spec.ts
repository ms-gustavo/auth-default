import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { validateDTO } from "../../middlewares/validateDTO";
import { RegisterUserDTO } from "./register";
import {
  errorMock,
  errorsMessages,
  UserDTOMock,
  removeKeyFromBody,
} from "./mocksAndUtils";

describe("Create User DTO Validation", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  const middleware = validateDTO(RegisterUserDTO);
  async function callMiddleware() {
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
  }

  const baseRequestBody = {
    name: UserDTOMock.name,
    email: UserDTOMock.email,
    password: UserDTOMock.password,
    role: UserDTOMock.role,
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

  it("should fail validation when name is missing", async () => {
    removeKeyFromBody(mockRequest, "name");
    await callMiddleware();

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("name", [
        errorsMessages.name.required,
        errorsMessages.name.invalid,
      ])
    );
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

  it("should fail validation when password is lower than 6 characteres", async () => {
    mockRequest.body.password = "12345";
    await callMiddleware();

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("password", [errorsMessages.password.min])
    );
  });

  it("should fail validation when password is greater than 20 characteres", async () => {
    mockRequest.body.password = "123457891234567891234";
    await callMiddleware();

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("password", [errorsMessages.password.max])
    );
  });

  it("should fail validation when role is invalid", async () => {
    mockRequest.body.role = "INVALID_ROLE" as any;
    await callMiddleware();

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      errorMock("role", [errorsMessages.role.invalid])
    );
  });
});
