import { ROLE } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterUserDTO {
  @IsString({ message: `Nome inválido, tente novamente` })
  @IsNotEmpty({ message: `O nome é obrigatório` })
  name!: string;

  @IsEmail({}, { message: `Email inválido, tente novamente` })
  @IsNotEmpty({ message: `O email é obrigatório` })
  email!: string;

  @IsString({ message: `Senha inválida, tente novamente` })
  @IsNotEmpty({ message: `A senha é obrigatória` })
  @MinLength(6, { message: `A senha deve ter no mínimo 6 caracteres` })
  @MaxLength(20, { message: `A senha deve ter no máximo 20 caracteres` })
  password!: string;

  @IsEnum(ROLE, { message: `Tipo de usuário inválido, tente novamente` })
  @IsOptional()
  role?: ROLE;
}
