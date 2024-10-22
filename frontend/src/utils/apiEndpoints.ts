const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiEndpoints = {
  login: `${apiBaseUrl}auth/login`,
  register: `${apiBaseUrl}auth/register`,
  googleLogin: `${apiBaseUrl}auth/google`,
  githubLogin: `${apiBaseUrl}auth/github`,
};
