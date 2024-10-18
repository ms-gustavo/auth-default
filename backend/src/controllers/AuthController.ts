import { Request, Response } from "express";
import { RegisterTempUserUseCase } from "../useCases/RegisterTempUser";
import { RegisterUserDTO } from "../dtos/AuthDTO/register";
import { AppError } from "../shared/AppError";
import { serverStringErrorsAndCodes } from "../utils/serverStringErrorsAndCodes";

const registerTempUserUseCase = RegisterTempUserUseCase();

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

  return {
    registerTempUser,
  };
}
