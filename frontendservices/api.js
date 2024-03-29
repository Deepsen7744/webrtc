const BASE_URL = 'http://localhost:3000'

export const endpoints = {
  SENDOTP_API: BASE_URL + '/api/auth/user/otp',
  SIGNUP_API: BASE_URL + '/api/auth/user/register',
  SIGNUP_APIi: BASE_URL + '/api/auth/expert/register',
  LOGIN_API: BASE_URL + '/api/auth/user/login',
  LOGIN_APIi: BASE_URL + '/api/auth/expert/login',
  RESETPASSTOKEN_API: BASE_URL + '/auth/reset-password-token',
  RESETPASSWORD_API: BASE_URL + '/auth/reset-password',
}

export const tagsEndpoints = {
  GET_TAGS_API: BASE_URL + '/api/tag/alltags',
}
