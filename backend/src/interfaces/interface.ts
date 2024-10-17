import { ROLE } from "@prisma/client";

export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

export interface RegisterTempUserProps extends RegisterUserProps {
  confirmId: string;
}
