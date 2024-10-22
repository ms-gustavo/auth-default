// utils/errorHandler.ts
import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    const apiMessage = error.response.data.message;
    const validationErrors = error.response.data.errors?.[0]?.errors?.[0];

    if (apiMessage !== "Erro de validação") {
      const errorMessage = apiMessage || defaultMessage;
      toast.error(errorMessage);
      return errorMessage;
    } else if (validationErrors) {
      const errorMessage = validationErrors || defaultMessage;
      toast.error(errorMessage);
      return errorMessage;
    }
  }
  const fallbackMessage = defaultMessage;
  toast.error(fallbackMessage);
  return fallbackMessage;
};
