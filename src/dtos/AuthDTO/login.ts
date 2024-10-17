import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
  @IsEmail({}, { message: "Email inválido, tente novamente" })
  @IsNotEmpty({ message: "O email é obrigatório" })
  email!: string;

  @IsString({ message: "Senha inválida, tente novamente" })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  password!: string;
}
