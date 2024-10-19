import { LoginUserUseCase } from "../useCases/LoginUser";
import { RegisterTempUserUseCase } from "../useCases/RegisterTempUser";
import { RegisterUserUseCase } from "../useCases/RegisterUser";

export const UseCases = {
  registerTempUserUseCase: RegisterTempUserUseCase(),
  registerUserUseCase: RegisterUserUseCase(),
  loginUserUseCase: LoginUserUseCase(),
};
