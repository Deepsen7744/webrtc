'use client'
import React, { useState } from 'react'
import { login, sendotp } from '@/frontendservices/operations/autoapi'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setSignupData } from '@/frontendservices/slices/authSlice'
const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Student',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const signupData = {
      ...formData,
    }
    console.log('signup page ')
    console.log(signupData)
    try {
      dispatch(setSignupData(signupData))
      dispatch(sendotp(formData.email, router))
      //   dispatch(login(formData.email,formData.password,router));yy
    } catch (error) {
      console.error('Error sending OTP:', error)
    }

    console.log('Form submitted:', formData)

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'Student',
    })
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Firstname:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          lastName:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Conform-Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
