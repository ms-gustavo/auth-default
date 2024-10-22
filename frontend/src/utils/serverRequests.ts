import axios from "axios";
import { apiEndpoints } from "./apiEndpoints";

export function serverRequests() {
  return {
    loginRequest: async (email: string, password: string) => {
      return await axios.post(apiEndpoints.login, {
        email,
        password,
      });
    },

    registerRequest: async (name: string, email: string, password: string) => {
      return await axios.post(apiEndpoints.register, {
        name,
        email,
        password,
      });
    },
  };
}
