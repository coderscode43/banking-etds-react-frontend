export const loginWithSSO =
  String(import.meta.env.VITE_LOGIN_WITH_SSO).toLowerCase() === "true";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const financialYear = import.meta.env.VITE_FINANCIAL_YEAR;
