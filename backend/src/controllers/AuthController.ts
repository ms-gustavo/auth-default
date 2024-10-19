import { Request, Response } from "express";
import { RegisterTempUserUseCase } from "../useCases/RegisterTempUser";
import { RegisterUserDTO } from "../dtos/AuthDTO/register";
import { AppError } from "../shared/AppError";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";
import { RegisterUserUseCase } from "../useCases/RegisterUser";
import { LoginUserDTO } from "../dtos/AuthDTO/login";
import { LoginUserUseCase } from "../useCases/LoginUser";

const registerTempUserUseCase = RegisterTempUserUseCase();
const registerUserUseCase = RegisterUserUseCase();
const loginUserUseCase = LoginUserUseCase();
export function AuthController() {
  async function registerTempUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, role }: RegisterUserDTO = req.body;

    try {
      const { message } = await registerTempUserUseCase.execute({
        name,
        email,
        password,
        role,
      });

      if (!message) {
        throw new AppError(
          serverStringErrorsAndCodes.P2030.message,
          serverStringErrorsAndCodes.P2030.code
        );
      }

      res.status(201).json({ message });
      return;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      res.status(serverStringErrorsAndCodes.P500.code).json({
        error: serverStringErrorsAndCodes.P500.message,
        message: (error as Error).message,
      });
      return;
    }
  }

  async function registerUser(req: Request, res: Response): Promise<void> {
    const { confirmId } = req.params as { confirmId: string };
    console.log("id", confirmId);

    try {
      const { userWithoutPassword, token } = await registerUserUseCase.execute(
        confirmId
      );

      if (!userWithoutPassword || !token) {
        throw new AppError(
          serverStringErrorsAndCodes.P2030.message,
          serverStringErrorsAndCodes.P2030.code
        );
      }

      res.status(201).json({ user: userWithoutPassword, token });
      return;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      res.status(serverStringErrorsAndCodes.P500.code).json({
        error: serverStringErrorsAndCodes.P500.message,
        message: (error as Error).message,
      });
      return;
    }
  }

  async function loginUser(req: Request, res: Response): Promise<void> {
    const { email, password }: LoginUserDTO = req.body;

    try {
      const { userWithoutPassword, token } = await loginUserUseCase.execute({
        email,
        password,
      });

      if (!userWithoutPassword || !token) {
        throw new AppError(
          serverStringErrorsAndCodes.P2030.message,
          serverStringErrorsAndCodes.P2030.code
        );
      }

      res.status(200).json({ user: userWithoutPassword, token });
      return;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      res.status(serverStringErrorsAndCodes.P500.code).json({
        error: serverStringErrorsAndCodes.P500.message,
        message: (error as Error).message,
      });
      return;
    }
  }

  return {
    registerTempUser,
    registerUser,
    loginUser,
  };
}
