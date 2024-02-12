const BASE_URL="http://localhost:3000"


export const endpoints = {
    SENDOTP_API: BASE_URL + "/api/auth/user/otp",
    SIGNUP_API: BASE_URL + "/api/auth/user/register",
    LOGIN_API: BASE_URL + "/api/auth/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }