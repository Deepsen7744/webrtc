import { endpoints } from '../api'
import { setLoading, setToken } from '@/frontendservices/slices/authSlice'
import { apiConnector } from '../apiconnector'
import { useRouter } from 'next/navigation'

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoints

export function sendotp(email, route) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      console.log(email)
      const response = await apiConnector('POST', SENDOTP_API, { email }) // Pass email as an object
      console.log('SENDOTP API RESPONSE............', response)
      console.log(email)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      route.push('/verify')
    } catch (err) {
      console.log(err)
    }
    dispatch(setLoading(false))
  }
}

export async function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp
) {
  try {
    const response = await apiConnector('POST', SIGNUP_API, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    router.push('/login')
  } catch (err) {
    console.log(err)
  }
}

export function login(email, password, router) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector('POST', LOGIN_API, {
        email,
        password,
      })
      console.log('LOGIN API RESPONSE............', response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      // const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      // dispatch(setUser({ ...response.data.user }))

      localStorage.setItem('token', JSON.stringify(response.data.token))
      // localStorage.setItem("user", JSON.stringify(response.data.user))
      // navigate("/")
      router.push('/')
    } catch (error) {
      console.log('LOGIN API ERROR............', error)
      toast.error('Login Failed')
    }
    dispatch(setLoading(false))
    //   toast.dismiss(toastId)
  }
}
